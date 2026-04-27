

import React, { useContext, useState } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const basicUserInfo = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      };

      setUserInfo(basicUserInfo);
      setLogin(true);
      navigate("/dashboard", { replace: true });

      const response = await axios.post("/api/user", basicUserInfo);
      setUserInfo(response.data.user);
    } catch (err) {
      console.error(err);
      alert("Something went wrong during login.");
      setLogin(false);
      setUserInfo(null);
      navigate("/", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.loginpage}>
      <div className={styles.logincard}>
        <div className={styles.loginheading}>
          <h1>Login</h1>
          <VpnKeyIcon />
        </div>
        <div
          className={styles.googleBtn}
          onClick={handleLogin}
          style={{
            pointerEvents: isSubmitting ? "none" : "auto",
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          <GoogleIcon sx={{ color: "red", fontSize: 20 }} />
          {isSubmitting ? "Signing in..." : "Sign in with Google"}
        </div>
      </div>
    </div>
  );
};

export default Login;
