import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { handleError, handleSuccess } from "../../utils";
import { ToastContainer,} from 'react-toastify';
import "./login.css";
function Login() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({  
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if ( !email || !password) {
      return handleError(" email and password are required");
    }
    try {
      const { data } = await axios.post("http://localhost:8080/auth/login", loginInfo);
       console.log(" FULL AXIOS RESPONSE:", data);
    console.log(" RESPONSE DATA:", data);
      const { success, message, error, jwtToken, name, _id} = data;
      
    console.log(" Extracted values:");
    console.log("jwtToken:", jwtToken);
    console.log("name:", name);
    console.log("_id:", _id);
    
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('loggedInUser', name);
      localStorage.setItem('_id', _id);

      console.log(" LocalStorage check:");
    console.log("Stored ID:", localStorage.getItem("_id"));
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
    <div className="login-page">
    <div className="login-card">
      <div className="back-btn" onClick={() => navigate("/")}>
  <i className="fas fa-arrow-left"></i>
</div>
      <div className="login-card-header">
      <i className="fas fa-infinity"></i> SkillSwap
    </div>
    <div className="profile-icon">
      <i className="fas fa-user"></i>
    </div>
      <h1>Welcome Back!</h1>
      <h2>Log in to continue your journey</h2>
      <form onSubmit={handleLogin}>
        
        <div>
          <label htmlFor="email">Email:</label>
        
          <input type="email" name="email" placeholder="Enter your email" value={loginInfo.email}   onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
         
          <input type="password" name="password" placeholder="Enter your password" value={loginInfo.password}   onChange={handleChange} />
        </div>

        <button type="submit" className="btn1">Login</button>
        <span>Don't have an account ?
          <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
}

export default Login;