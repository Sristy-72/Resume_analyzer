import React from 'react'
import styles from './History.module.css';
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/withAuthHOC';
import { useState, useEffect, useContext } from 'react';
import axios from '../../utils/axios'
import { AuthContext } from '../../utils/AuthContext';

const History = () => {
  const[data, setData]= useState([])
  const [loader, setLoader]= useState(false);
  
  const {userInfo}= useContext(AuthContext)

 useEffect (()=>{
  const fetchUserData= async()=>{
    setLoader(true)
    try{
     const results = await axios.get(`api/resume/${userInfo?._id}`)
     console.log(results)
     setData(results.data.resumes)
    }catch{
      console.log(err)
      alert("something went wrong")
    }finally{
      setLoader(false)
    }
  }
  fetchUserData()
 }, [])

  return (
    <div className={styles.history}>
      <div className={styles.cardblock}>
        {
          loader && <>
          <Skeleton  variant="rectangular" sx={{borderRadius:"20px"}} width={280} height={280}/>
          <Skeleton  variant="rectangular" sx={{borderRadius:"20px"}} width={280} height={280}/>
          <Skeleton  variant="rectangular" sx={{borderRadius:"20px"}} width={280} height={280}/>
         
          </>
        }


        {
          data.map((item, index)=>{
            return (
              <div key={item._id} className={styles.card}> 
          <div className={styles.perheading}>{item.score}%</div>
          {/* <h3>Frontened Developer</h3> */}
          <p>Resume Name:{item.resume_name}</p>
           <p>{item.feedback}</p>
           <p>Date:{item.updatedAt.slice(0,10)}</p>
        </div>
            );
          })
        }
         
      </div>
    </div>
  )
}

export default WithAuthHOC(History)
