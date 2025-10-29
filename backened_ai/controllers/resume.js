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

exports.addResume = async (req, res) => {
  try {
    const { job_desc, user } = req.body;
    const pdfPath = req.file.path;

    // Read and parse the uploaded resume PDF
    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(dataBuffer);

    //  Build your prompt as before
    const prompt = `
      You are a resume screening assistant.
      Compare the following resume text with the provided Job Description (JD) 
      and give a match score (0-100) 
      

      Resume:
      ${pdfData.text}

      Job Description:
      ${job_desc}

      Return the score and a brief explanation in this format:
      Score: XX
      Reason: ...
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
      temperature: 0.7,
    });

    //  Extract the text properly
    let result = response.message.content[0].text;
    console.log(result);

    //  Optional: send back to client
    // res.json({
    //   success: true,
    //   scoreFeedback: result,
    // });
    const scoreMatch = result.match(
      /(?:Score|Match Score)\s*[:\-]?\s*(\d{1,3})/i
    );
    const reasonMatch = result.match(
      /(?:Reason|Feedback)\s*[:\-]?\s*([\s\S]*)/i
    );

    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : null;
    const reason = reasonMatch ? reasonMatch[1].trim() : null;
    //  console.log(req.file)
    const newResume = new ResumeModel({
      user,
      resume_name: req.file.originalname,
      job_desc,
      score,
      feedback: reason,
    });
    await newResume.save();
    fs.unlinkSync(pdfPath);
    return res.json({
      score:score,
      success: true,
      feedback: result,
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
