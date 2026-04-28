import './navbar.css';
import { useState } from "react";
import {useNavigate} from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
   <nav className="navbar navbar-expand-lg  fixed-top">
  <div className="container-fluid">
    <div className="navbar-brand skillswap" href="#"> <i className="fa-solid fa-infinity"></i>  SkillSwap</div>
    <button
      className="navbar-toggler"
      type="button"
      aria-controls="navbarNav"
      aria-expanded={isMenuOpen}
      aria-label="Toggle navigation"
      onClick={() => setIsMenuOpen((open) => !open)}
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
      <ul className="navbar-nav mx-auto gap-4">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/" onClick={closeMenu}>Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login" onClick={closeMenu}>Explore</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login" onClick={closeMenu}>Swap Skills</a>
        </li>
       <li className="nav-item">
          <a className="nav-link" href="/login" onClick={closeMenu}>Login</a>
        </li>
       
      </ul>
      <div className="ms-auto  join">
            <button onClick={() => { closeMenu(); navigate("/signup"); }} className="btn px-4">
              Join Now
            </button>
          </div>
    </div>
  </div>
</nav>
  );
}
