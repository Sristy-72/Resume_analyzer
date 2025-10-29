import React from 'react'
import { useState } from 'react';
import styles from './DashBoard.module.css'
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/withAuthHOC';
import axios from '../../utils/axios';
import { AuthContext } from '../../utils/AuthContext';
import { useContext } from 'react';
const DashBoard = () => {
  const [uploadFiletext, setUploadFileText]= useState("upload your resume");
  const [loading , setLoading]= useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const[jobDesc, setJobDesc]= useState();
  const[result, setResult]= useState(null);
  
  const {userInfo}= useContext(AuthContext);


  const handleOnChangeFile= (e)=>{
    setResumeFile(e.target.files[0])
    setUploadFileText(e.target.files[0].name)
  }

const handleUpload = async () => {
  setResult(null);

  if (!jobDesc || !resumeFile) {
    alert('Please upload resume and fill Job Description');
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
    const response = await axios.post('/api/resume/addResume', formData);
    setResult(response.data.data || response.data);
  } catch (err) {
  } finally {
    setLoading(false);
  }
};



  return (
    <div className={styles.DashBoard}>
      <div className={styles.DashboardLeft}>
           <div className={styles.headings}>
            <div className={styles.firstheading}> Smart Resume Screening</div>
            <div className={styles.secondheading}> Resume Match Score</div>
           </div>
           <div className={styles.importantcard}>
              <div > 🔔Important Instructions:</div>
              <div className={styles.impcontent}>
                <p> 📄 Please paste the complete job description in the "Job Description" field before submitting .</p>
                <p> 📎Only PDF format(.pdf) resumes are accepted</p>
              </div>
           </div>

            <div className={styles.uploadresume}>
            <div className={styles.text}> {uploadFiletext}</div>
            <div className={styles.dashboardinputfield}>
              <label htmlFor='inputField' className={styles.analyzeAIBtn}> Upload Resume</label>
              <input type='file' accept="application/pdf" id='inputField' onChange={handleOnChangeFile} />
            </div>
           </div>
           <div className={styles.jobDesc}>
            <textarea value={jobDesc} onChange={(e)=>{setJobDesc(e.target.value)}} className={styles.textArea} placeholder='Paste Your Job Description' rows={10} cols={50}></textarea>
            <div  onClick={handleUpload} className={styles.Analyzebtn}> Analyze</div>
           </div>
         </div>
         <div className={styles.dashboardright}>
          <div className={styles.rightcard}>
            <div>Analyze with AI</div>
            <img className={styles.profileimg} src={userInfo.photoUrl} alt="" />
            <h3>{userInfo.name}</h3>
          </div>


          { 
          result && <div className={styles.rightcard}>
            <div>Result</div>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              
              <h3>{result?.score}%  </h3>
             
            </div>
            <div className={styles.feedback}>
              <h4 className={styles.heading}>Feedback</h4>
              <p className={styles.paragraph}>{result?.feedback}</p>
             
            </div>
          </div>
          }


          {
            loading &&  <Skeleton  variant="rectangular" sx={{borderRadius:"20px"}} width={280} height={280}/>
          }
         
         </div>
    </div>
  )
}

export default WithAuthHOC(DashBoard)
