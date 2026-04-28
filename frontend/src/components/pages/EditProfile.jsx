import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./editProfile.css";
import Header from "../home/Header";
const EditProfile = () => {
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [skillsToLearn, setSkillsToLearn] = useState([]);
  const [skillsToTeach, setSkillsToTeach] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8080/profile/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();


        setBio(data.bio || "");
        setLocation(data.location || "");
        setPortfolio(data.portfolio || "");
        setProfilePic(data.profilePic || "");
        setSkillsToLearn(data.skillsToLearn || []);
        setSkillsToTeach(data.skillsToTeach || []);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:8080/profile/complete-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bio,
            location,
            portfolio,
            profilePic,
            skillsToLearn,
            skillsToTeach,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      navigate("/profile");
    } catch (error) {
      console.error("Save profile error:", error);
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading profile...</p>;
  }

  return (
    <> <Header />
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <h1>Edit Profile</h1>

        <label>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label>Portfolio</label>
        <input
          type="text"
          value={portfolio}
          onChange={(e) => setPortfolio(e.target.value)}
        />

        <label>Profile Picture URL</label>
        <input
          type="text"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
        />

        <label>Skills to Learn (comma separated)</label>
        <input
          type="text"
          value={skillsToLearn.join(", ")}
          onChange={(e) =>
            setSkillsToLearn(
              e.target.value.split(",").map((s) => s.trim())
            )
          }
        />

        <label>Skills to Teach (comma separated)</label>
        <input
          type="text"
          value={skillsToTeach.map((s) => s.skillName).join(", ")}
          onChange={(e) =>
            setSkillsToTeach(
              e.target.value.split(",").map((skill) => ({
                skillName: skill.trim(),
              }))
            )
          }
        />

        <div className="edit-profile-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={() => navigate("/profile")}>Cancel</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default EditProfile;
