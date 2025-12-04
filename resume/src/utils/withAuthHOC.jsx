

// import { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "./AuthContext";


// const WithAuthHOC = (WrappedComponent) => {
//   const AuthenticatedComponent = (props) => {
//     const navigate = useNavigate();
//     const { setLogin } = useContext(AuthContext);

//     useEffect(() => {
//       const isLogin = localStorage.getItem("isLogin");
//       if (!isLogin) {
//         setLogin(false);
//         navigate("/");
//       }
//     }, [navigate, setLogin]);

//     return <WrappedComponent {...props} />;
//   };

//   return AuthenticatedComponent;
// };

// export default WithAuthHOC;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WithAuthHOC = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    // INSTANT AUTH CHECK (no delay)
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      navigate("/", { replace: true });
      return null; // prevent rendering component before redirect
    }

    // EXTRA SAFETY CHECK INSIDE EFFECT (rarely needed)
    useEffect(() => {
      if (!localStorage.getItem("isLogin")) {
        navigate("/", { replace: true });
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default WithAuthHOC;
