import React, { useState, useEffect, useContext } from "react";
import styles from "./Admin.module.css";
import Skeleton from "@mui/material/Skeleton";
import WithAuthHOC from "../../utils/withAuthHOC";
import axios from "../../utils/axios";
import { AuthContext } from "../../utils/AuthContext";
const Admin = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoader(true);
      try {
        let results;
        if (userInfo?.role === "admin") {
          results = await axios.get(`/api/resume/get`);
        } else {
          results = await axios.get(`/api/resume/${userInfo?._id}`);
        }
       // console.log(results.data.resumes);
        //console.log(userInfo);
        setData(results.data.resumes);
      } catch (err) {
        console.log(err);
        alert("something went wrong");
      } finally {
        setLoader(false);
      }
    };
    fetchAllData();
  }, []);
  return (
    <div className={styles.admin}>
      <div className={styles.cardblock}>
        {loader && (
          <>
            <Skeleton
              variant="rectangular"
              sx={{ borderRadius: "20px" }}
              width={280}
              height={280}
            />

            <Skeleton
              variant="rectangular"
              sx={{ borderRadius: "20px" }}
              width={280}
              height={280}
            />

            <Skeleton
              variant="rectangular"
              sx={{ borderRadius: "20px" }}
              width={280}
              height={280}
            />
          </>
        )}
        {data.map((item, index) => {
          return (
            <div key={item._id} className={styles.card}>
              <h2> {item?.user?.name}</h2>

              <h3>Score:{item.score}</h3>
              <p style={{ color: "blue" }}>{item?.user?.email}</p>
              <div className={styles.perheading}>{item?.resume_name}</div>

              <p>{item.feedback}</p>
              <p>Date:{item.updatedAt.slice(0,10)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WithAuthHOC(Admin);
