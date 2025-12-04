import React, { useContext } from 'react'
import styles from './Sidebar.module.css'
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../utils/AuthContext';
const Sidebar = () => {
  const location= useLocation();
  const navigate = useNavigate();
    
    const {userInfo, isLogin, setLogin, setUserInfo}= useContext(AuthContext);

 const handleLogout =()=>{
  localStorage.clear();
  setLogin(false);
  setUserInfo(null);
  navigate("/", { replace: true });

 }

  return (
    <div className={styles.sidebar}>
     <div className={styles.sidebaricon}>
      <ArticleIcon sx={{fontSize:54, marginBottom:2}} />
      <div className={styles.sideBarTopContent}>Resume screening</div>
     </div>
     <div className={styles.sideBarOptionsBlock}>
      <Link to={'./dashboard'} className={[styles.sideBarOption, location.pathname==='/dashboard'? styles.selectedOption:null].join(' ')} > 
      {/* agar pathname mera dashboard rahega to selectedoption wala style lagega nahi to kychh nahi */}
         <DashboardIcon sx={{fontSize:22}} />
         <div>DashBoard</div>
        </Link>
         <Link to={'./history'} className={[styles.sideBarOption, location.pathname==='/history'? styles.selectedOption:null].join(' ')} >
         <HistoryIcon sx={{fontSize:22}} />
         <div>History</div>
        </Link>
        {
          userInfo?.role==="admin" &&  <Link to={'./admin'} className={[styles.sideBarOption, location.pathname==='/admin'? styles.selectedOption:null].join(' ')} >
         <AdminPanelSettingsIcon sx={{fontSize:22}} />
         <div>Admin</div>
        </Link>
        }
         <div onClick={handleLogout} className={styles.sideBarOption} >
         <LogoutIcon sx={{fontSize:22}} />
         <div>LogOut</div>
        </div>
     </div>
    </div>
  )
}

export default Sidebar
