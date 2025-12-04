import './App.css'
import Sidebar from './Components/sidebarpanel/Sidebar'
import { Routes, Route, useLocation } from 'react-router-dom';
import DashBoard from './Components/DashBoard/DashBoard'
import Admin from './Components/Admin/Admin'
import History from './Components/History/History';
import Login from './Components/Login/Login';

function App() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/";

  return (
    <div className='App'>
      {!hideSidebar && <Sidebar />}
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  )
}

export default App;
