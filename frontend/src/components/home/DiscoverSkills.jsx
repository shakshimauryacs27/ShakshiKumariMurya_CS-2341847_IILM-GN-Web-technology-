import React, { useState, useEffect } from "react";
import ProfileModal from "./ProfileModal";
import "./home.css";
import Header from "./Header";
function DiscoverSkills() {
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [usersForSkill, setUsersForSkill] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/skills", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setSkills(data || []);
      } catch (err) {
        console.error("Failed to fetch skills:", err);
      }
    };

    fetchSkills();
  }, []);

  const handleSkillClick = async (skill) => {
    setSelectedSkill(skill);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/skills/${skill}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsersForSkill(data.map((user) => ({ user })));
    } catch (err) {
      console.error("Failed to fetch users for skill:", err);
    }
  };

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
<> <Header />

    <div className="discover-skills">
      {!selectedSkill ? (
        <>
          <h2>Discover Skills</h2>
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="skills-grid">
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="skill-card"
                  onClick={() => handleSkillClick(skill)}
                >
                  {skill}
                </div>
              ))
            ) : (
              <p>No skills found.</p>
            )}
          </div>
        </>
      ) : (
        <>
          
          <h3>Users for {selectedSkill}</h3>
          <div className="matches-grid">
            {usersForSkill.length > 0 ? (
              usersForSkill.map((userObj) => (
                <div
                  key={userObj.user._id}
                  className="match-card"
                  onClick={() => setSelectedUser(userObj)}
                >
                  <img
                    src={
                      userObj.user.profilePic ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt={userObj.user.name}
                    className="match-img"
                  />
                  <h4>{userObj.user.name}</h4>
                  <p>
                    Expertise:{" "}
                    {userObj.user.skillsToTeach?.length
                      ? userObj.user.skillsToTeach
                          .map((s) => s.skillName)
                          .join(", ")
                      : "None"}
                  </p>
                  <p>
                    Learning Goals:{" "}
                    {userObj.user.skillsToLearn?.length
                      ? userObj.user.skillsToLearn.join(", ")
                      : "None"}
                  </p>
                </div>
              ))
            ) : (
              <p>No users found for this skill.</p>
            )}
          </div>
        </>
      )}

      
      {selectedUser && (
        <ProfileModal
          selectedMatch={selectedUser}
          closeModal={() => setSelectedUser(null)}
        />
      )}
     
    </div>
    </>
  );
}

export default DiscoverSkills;
