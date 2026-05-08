import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import DashBoard from './Components/DashBoard/DashBoard'
import Admin from './Components/Admin/Admin'
import History from './Components/History/History';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';


function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  return (
    <div className='App'>
      {!hideNavbar && <Navbar />}
      <main className='AppMain' >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path ="/home" element ={<Home />} />
        {/* upload section same as analyze  */} 
        
        <Route path="/analyze" element={<DashBoard />} />  
        <Route path="/admin" element={<Admin />} />
        <Route path="/history" element={<History />} />
      </Routes>
      </main>
    </div>
  )
}

export default App;
