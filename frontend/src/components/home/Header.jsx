import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from "../../utils";
import { ToastContainer,} from 'react-toastify';
import "./home.css";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 const handleLogout = (e) =>{
  setIsMenuOpen(false);
  localStorage.removeItem('token');
  localStorage.removeItem('loggedInUser');
  handleSuccess('user logged out');
  setTimeout(()=>{
    navigate('/login');
  }, 1000)
 }
  return (
    <header className="header">
      <div className="logo">
        <span className="brand"    onClick={() => { navigate("/home");}}><i className="fa-solid fa-infinity"></i>  SkillSwap</span>
      </div>
      <button
        className="header-toggle"
        type="button"
        aria-label="Toggle profile menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
      </button>
        <div className={`header-right ${isMenuOpen ? "open" : ""}`}>
    <button onClick={handleLogout}>logout</button>
    <div className="profile-icon" onClick={() => { setIsMenuOpen(false); navigate("/profile");}}>
      <i className="fa-solid fa-user"></i>
    </div>
  </div>
       <ToastContainer />
    </header>
  );
};

export default Header;
