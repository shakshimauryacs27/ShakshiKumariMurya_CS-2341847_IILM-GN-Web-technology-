import React, { useState, useEffect } from "react";
import './profile.css';
import { useNavigate } from "react-router-dom";
import Header from "../home/Header";
import { motion } from "framer-motion";
const Profile = () => {
const [userData, setUserData] = useState(null);
const navigate = useNavigate();

 useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token"); 
      const res = await fetch("http://localhost:8080/profile/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await res.json();
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchProfile();
}, []);

if (!userData) {
  return <p>Loading profile...</p>; 
}

  return (
    <> <Header />
    <div className="profile-page-container">
      <motion.div
  className="profile-card"
  initial={{ y: 80, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
        <div className="profile-header">
          <div className="image-container">
            <img src={userData?.profilePic} alt="Profile" className="profile-img" />
          </div>
          <h1>{userData?.name}</h1>
          
        </div>

        <div className="profile-content">
          <section className="profile-section">
            <h1>My Profile</h1> 
            <h3>About Me</h3>
            <p>{userData?.bio}</p>
            <h3>Portfolio link</h3>
             <p>{userData?.portfolio}</p>
            <h3>Location</h3>
             <p>{userData?.location}</p>
             
          </section>

          <div className="skills-grid">
            <section className="profile-section">
              <h3>My Skills</h3>
              <div className="skill-tags">
                {userData?.skillsToTeach?.map(skill => (
                  <span key={skill.skillName} className="tag share">{skill.skillName}</span>
                ))}
              </div>
            </section>

            <section className="profile-section">
              <h3>Interests</h3>
              <div className="skill-tags">
                {userData?.skillsToLearn?.map(skill => (
                  <span key={skill} className="tag learn">{skill}</span>
                ))}
              </div>
              <br />
               
            </section>
            
          </div>
        </div>

        <div className="profile-footer">
          <button className="swap-btn" onClick={() => navigate("/home")}>Start Swapping</button>
          <button className="edit-btn"  onClick={() => navigate("/edit-profile")}>Edit Profile</button>
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default Profile;