// import React, { useContext } from "react";
// import styles from "./Login.module.css";
// import VpnKeyIcon from "@mui/icons-material/VpnKey";
// import GoogleIcon from "@mui/icons-material/Google";
// import { auth, provider } from "../../utils/firebase";
// import { signInWithPopup } from "firebase/auth";
// import { AuthContext } from "../../utils/AuthContext";
// import { useNavigate } from "react-router-dom";
// import axios from "../../utils/axios";
// const Login = () => {
//   const { isLogin, setLogin, userInfo, setUserInfo } = useContext(AuthContext); // ye data authcontext se usecontext ke help se yaha la rahe directly
//   const navigate = useNavigate();
//   const handleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       const userData = {
//         name: user.displayName,
//         email: user.email,
//         photoUrl: user.photoURL,
//       };

//       await axios
//         .post("/api/user", userData)
//         .then((response) => {
//           setUserInfo(response.data.user);
//           localStorage.setItem("userInfo",JSON.stringify(response.data.user));
//           localStorage.setItem("isLogin", true);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       setLogin(true);

//       // localStorage.setItem("isLogin", true)

//       navigate("./dashboard");
//     } catch (err) {
//       alert("Something Went Wrong");
//       console.log(err);
//     }
//   };
//   return (
//     <div className={styles.loginpage}>
//       <div className={styles.logincard}>
//         <div className={styles.loginheading}>
//           <h1>Login</h1>
//           <VpnKeyIcon />
//         </div>
//         <div className={styles.googleBtn} onClick={handleLogin}>
//           <GoogleIcon sx={{ color: "red", fontSize: 20 }} />
//           Sign in with Google
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useContext } from "react";
import styles from "./Login.module.css";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, provider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { AuthContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

const Login = () => {
  const { setLogin, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      };

      const response = await axios.post("/api/user", userData);
      const userInfo = response.data.user;

      // Store in context + localStorage
      setUserInfo(userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("isLogin", "true");
      setLogin(true);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong during login.");
    }
  };

  return (
    <div className={styles.loginpage}>
      <div className={styles.logincard}>
        <div className={styles.loginheading}>
          <h1>Login</h1>
          <VpnKeyIcon />
        </div>
        <div className={styles.googleBtn} onClick={handleLogin}>
          <GoogleIcon sx={{ color: "red", fontSize: 20 }} />
          Sign in with Google
        </div>
      </div>
    </div>
  );
};

export default Login;
