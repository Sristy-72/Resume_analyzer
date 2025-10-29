

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

import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import  {AuthContext } from "./AuthContext";
const WithAuthHOC=(WrappedComponent)=>{
  
      return (props)=>{
     const navigate= useNavigate();
    //  const[isLogin, setLogin]= useState(false);
    const{setLogin}= useContext(AuthContext)
       useEffect(()=>{
        const isLogin= localStorage.getItem('isLogin');
        if(!isLogin){
          navigate('/')
          return ;
        }
        
       },[navigate, setLogin])
       return <WrappedComponent {...props} />;
      }
}
export default WithAuthHOC;