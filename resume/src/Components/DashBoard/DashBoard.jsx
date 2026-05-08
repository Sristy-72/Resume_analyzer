import React from "react";
import { useState } from "react";
import styles from "./DashBoard.module.css";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Skeleton from "@mui/material/Skeleton";
import WithAuthHOC from "../../utils/withAuthHOC";
import axios from "../../utils/axios";
import { AuthContext } from "../../utils/AuthContext";
import { useContext } from "react";
const DashBoard = () => {
  const [uploadFiletext, setUploadFileText] = useState("upload your resume");
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);

  const { userInfo } = useContext(AuthContext);

  const handleOnChangeFile = (e) => {
    setResumeFile(e.target.files[0]);
    setUploadFileText(e.target.files[0].name);
  };

  const handleUpload = async () => {
    setResult(null);

    if (!jobDesc.trim() || !resumeFile) {
      alert("Please upload resume and fill Job Description");
      return;
    }

    if (!userInfo?._id) {
      alert("We are still loading your account. Please try again in a moment.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_desc", jobDesc);
    formData.append("user", userInfo?._id);

    // log formData entries
    // for (let pair of formData.entries()) {
    //   console.log("FormData entry:", pair[0], pair[1]);
    // }

    setLoading(true);

    try {
      const response = await axios.post("/api/resume/addResume", formData);
      setResult(response.data.data || response.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
const getColor = (score) => {
  if (score >= 80) return "#4caf50";
  if (score >= 50) return "#ff9800";
  return "#f44336";
};

 return (
  <div className={styles.DashBoard}>

    <div className={styles.heroSection}>

      <h1 className={styles.firstheading}>
        Smart Resume Analyzer
      </h1>

      <p className={styles.secondheading}>
        Upload your resume and get instant ATS score with AI feedback
      </p>

    </div>

    <div className={styles.uploadBox}>

      <div className={styles.uploadHeading}>
        Upload Resume
      </div>

      <div className={styles.note}>
        📌 Upload PDF resume and paste complete job description for best ATS analysis.
      </div>

      <label
        htmlFor="inputField"
        className={styles.uploadCard}
      >

        <div className={styles.uploadIcon}>
          📄
        </div>

        <h3>Browse Resume</h3>

        <p>{uploadFiletext}</p>

      </label>

      <input
        type="file"
        accept="application/pdf"
        id="inputField"
        onChange={handleOnChangeFile}
      />

      <textarea
        value={jobDesc}
        onChange={(e) => {
          setJobDesc(e.target.value);
        }}
        className={styles.textArea}
        placeholder="Paste complete job description here..."
      />

      <button
        onClick={handleUpload}
        className={styles.Analyzebtn}
      >
        Analyze Resume
      </button>

    </div>

    <div className={styles.resultDashboard}>

      {loading && (
        <Skeleton
          variant="rectangular"
          sx={{
            borderRadius: "24px",
            bgcolor: "rgba(255,255,255,0.08)",
            width:"65%",
            height:"400px",
          }}
          
        />
      )}

      {result && (
        <div className={styles.resultCard}>

          <div className={styles.resultText}>
            ATS Match Score
          </div>

          <div className={styles.circleWrapper}>

            <div
              className={styles.circle}
              style={{
                background: `conic-gradient(${getColor(result.score)} ${result.score * 3.6}deg, #2a2a40 0deg)`
              }}
            >

              <div className={styles.innerCircle}>
                {result.score}%
              </div>

            </div>

          </div>

          <div className={styles.feedback}>

            <h4 className={styles.heading}>
              AI Feedback
            </h4>

            <div className={styles.description}>
              {result?.feedback}
              </div>
          </div>

        </div>
      )}

    </div>

  </div>
);
};

export default WithAuthHOC(DashBoard);
