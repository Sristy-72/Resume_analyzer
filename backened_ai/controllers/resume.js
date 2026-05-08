const ResumeModel = require("../models/resume");
const { CohereClientV2 } = require("cohere-ai"); //  use V2 client
const pdfParse = require("pdf-parse");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

//  Initialize new Cohere client
const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

// A tiny "remove-markdown"-style sanitizer to keep Cohere markdown (**, *, backticks, etc.)
// from showing up as raw characters in the UI.
function stripMarkdown(text) {
  if (!text) return "";

  let out = String(text);

  // Remove fenced code blocks but keep the inner code
  out = out.replace(/```[\s\S]*?```/g, (block) => block.replace(/```/g, ""));

  // Inline code
  out = out.replace(/`([^`]+)`/g, "$1");

  // Images/links
  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1");
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");

  // Headings and blockquotes
  out = out.replace(/^\s{0,3}#{1,6}\s+/gm, "");
  out = out.replace(/^\s{0,3}>\s?/gm, "");

  // Emphasis markers
  out = out.replace(/\*\*([^*]+)\*\*/g, "$1");
  out = out.replace(/\*([^*\n]+)\*/g, "$1");
  out = out.replace(/__([^_]+)__/g, "$1");
  out = out.replace(/_([^_\n]+)_/g, "$1");

  // Strip list leaders (similar to remove-markdown's default `stripListLeaders: true`)
  out = out.replace(/^(\s*)(?:[*+-])\s+/gm, "$1");
  out = out.replace(/^(\s*)\d+\.\s+/gm, "$1");

  // Any leftover repeated asterisks used for emphasis
  out = out.replace(/\*{2,}/g, "");

  // Whitespace normalization
  out = out.replace(/\r\n/g, "\n").replace(/[ \t]+\n/g, "\n");

  return out.trim();
}

exports.addResume = async (req, res) => {
  try {
    const { job_desc, user } = req.body;
    const pdfPath = req.file.path;

    // Read and parse the uploaded resume PDF
    //const dataBuffer = fs.readFileSync(pdfPath);
    //const dataBuffer = await fs.promises.readFile(pdfPath);
    const dataBuffer = req.file.buffer;
    const pdfData = await pdfParse(dataBuffer);

    //  Build your prompt as before
    const prompt = `
Generate a JSON object with exactly these fields:
- score: integer (0-100)
- feedback: string (plain text only; no markdown; do not use *, **, _, or backticks)

Compare the following resume text with the provided Job Description (JD) and produce the JSON.

Resume:
${pdfData.text}

Job Description:
${job_desc}
`;

    //  NEW Chat API call
    const response = await cohere.chat({
      model: "command-a-03-2025", //(latest model)
      messages: [
        {
          role: "system",
          content: "You are a helpful resume evaluation assistant.",
        },
        { role: "user", content: prompt },
      ],
      response_format: {
        type: "json_object",
        schema: {
          type: "object",
          properties: {
            score: { type: "integer" },
            feedback: { type: "string" },
          },
          required: ["score", "feedback"],
        },
      },
      temperature: 0,
    });

    //  Extract the text properly
    let result = response.message.content[0].text;
    console.log(result);

    let score = null;
    let feedback = "";

    try {
      const parsed = JSON.parse(result);
      const parsedScore =
        typeof parsed?.score === "number" ? parsed.score : Number(parsed?.score);
      score = Number.isFinite(parsedScore) ? parsedScore : null;
      feedback =
        typeof parsed?.feedback === "string"
          ? parsed.feedback
          : parsed?.feedback == null
            ? ""
            : String(parsed.feedback);
    } catch (e) {
      // Fallback if the model output wasn't JSON for any reason.
      const scoreMatch = result.match(
        /(?:Score|Match Score)\s*[:\-]?\s*(\d{1,3})/i
      );
      const reasonMatch = result.match(
        /(?:Reason|Feedback)\s*[:\-]?\s*([\s\S]*)/i
      );

      score = scoreMatch ? parseInt(scoreMatch[1], 10) : null;
      feedback = reasonMatch ? reasonMatch[1].trim() : result;
    }

    const cleanedFeedback = stripMarkdown(feedback);
    //  console.log(req.file)
    const newResume = new ResumeModel({
      user,
      resume_name: req.file.originalname,
      job_desc,
      score,
      feedback: cleanedFeedback,
    });
    await newResume.save();
    //fs.unlinkSync(pdfPath);
    //await fs.promises.unlink(pdfPath);
    return res.json({
      score:score,
      success: true,
      feedback: cleanedFeedback,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.getAllResumesForUser = async (req, res) => {
  try {
  
    const { user } = req.params;
   // console.log("Userid",user)
    if(!user){
      return res.status(400).json({status : false , message : "User cannot be empty"});
    }
  
    if(!mongoose.isValidObjectId(user)){
      return res.status(400).json({status : false , message : "Not valid user id provided"});
    }

    let resumes = await ResumeModel.find({ user: user })
  .populate("user", "name email")
  .sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ message: "Your Previous History", resumes: resumes });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "server error", message: err.message });
  }
};
exports.getResumeForAdmin = async (req, res) => {
  try {
    let resumes = await ResumeModel.find({}).sort({ createdAt: -1 }).populate('user', 'name email');
    return res
      .status(200)
      .json({ message: "Fetched All History", resumes: resumes });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "server error", message: err.message });
  }
};
