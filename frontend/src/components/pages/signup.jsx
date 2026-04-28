import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { handleError, handleSuccess } from "../../utils";
import { ToastContainer,} from 'react-toastify';
import "./signup.css";
function Signup() {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name, email and password are required");
    }
    try {
      const { data } = await axios.post("http://localhost:8080/auth/signup", signupInfo);
      const { success, message, error } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/home"), 1000);
      }
      else if (error) {
        const details = error?.details?.[0]?.message || message || "Something went wrong!";
        handleError(details);
      }
      else if (!success) {
        handleError(message);
        console.log(data);
      }
    }
    catch (err) { console.log(err); 
      handleError(err.message || "An unexpected error occurred!");
    }

  }
  return (
    <div className="signup-page">
    <div className="signup-card">
         <div className="back-btn" onClick={() => navigate("/")}>
  <i className="fas fa-arrow-left"></i>
</div>
      <div className="signup-card-header">
      <i className="fas fa-infinity"></i> SkillSwap
    </div>
      <h1>Join SkillSwap Today</h1>
      <h2>Create your account and start learning!</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name:</label>
          
          <input type="name" name="name" placeholder="Enter your full name" value={signupInfo.name}   onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
        
          <input type="email" name="email" placeholder="Enter your email" value={signupInfo.email}   onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
         
          <input type="password" name="password" placeholder="Enter your password" value={signupInfo.password}   onChange={handleChange} />
        </div>

        <button type="submit" className="btn1">Sign Up</button>
        <span>Already have an account ?
          <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
}

export default Signup;
