import React, { useState, useEffect } from "react";
import "./myskills.css"; 
import Header from "./Header";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
const MySkills = () => {
  const [skillsToTeach, setSkillsToTeach] = useState([]);
  const [skillsToLearn, setSkillsToLearn] = useState([]);
  const [newTeachSkill, setNewTeachSkill] = useState("");
  const [newTeachLevel, setNewTeachLevel] = useState("beginner");
  const [newLearnSkill, setNewLearnSkill] = useState("");
  const [loading, setLoading] = useState(true);

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

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setSkillsToTeach(data.skillsToTeach || []);
        setSkillsToLearn(data.skillsToLearn || []);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  
  const handleAddTeachSkill = () => {
    if (newTeachSkill.trim() === "") return;
    setSkillsToTeach([
      ...skillsToTeach,
      { skillName: newTeachSkill.trim(), experienceLevel: newTeachLevel },
    ]);
    setNewTeachSkill("");
    setNewTeachLevel("beginner");
  };

  const handleRemoveTeachSkill = (index) => {
    setSkillsToTeach(skillsToTeach.filter((_, i) => i !== index));
  };
  const handleAddLearnSkill = () => {
    if (newLearnSkill.trim() === "") return;
    setSkillsToLearn([...skillsToLearn, newLearnSkill.trim()]);
    setNewLearnSkill("");
  };

  const handleRemoveLearnSkill = (index) => {
    setSkillsToLearn(skillsToLearn.filter((_, i) => i !== index));
  };

  const handleSaveSkills = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/profile/complete-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ skillsToTeach, skillsToLearn }),
      });

      if (!res.ok) throw new Error("Failed to save skills");

      alert("Skills updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating skills");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
  <div className="my-skills">
    <Header />
    <motion.div
  className="my-skills-container"
  initial={{ y: 80, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
       
      <h1>Update Your Skills</h1>
<hr />
    
      <section>
        <h3> My Skills</h3>
        <div className="skill-tags">
          {skillsToTeach.map((skill, index) => (
            <span key={index} className="tag share">
              {skill.skillName} [{skill.experienceLevel}]
              <button
                className="remove-btn"
                onClick={() => handleRemoveTeachSkill(index)}
              >
                 <AiOutlineClose size={14} />
              </button>
            </span>
          ))}
        </div>

        <div className="skill-input">
          <input
            type="text"
            placeholder="New skill to teach"
            value={newTeachSkill}
            onChange={(e) => setNewTeachSkill(e.target.value)}
          />
          <select
            value={newTeachLevel}
            onChange={(e) => setNewTeachLevel(e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
          <button className="add-btn" onClick={handleAddTeachSkill}>Add</button>
        </div>
      </section>

      
      <section>
        <h3>My Intrests</h3>
        <div className="skill-tags">
          {skillsToLearn.map((skill, index) => (
            <span key={index} className="tag learn">
              {skill}
              <button
                className="remove-btn"
                onClick={() => handleRemoveLearnSkill(index)}
              >
                 <AiOutlineClose size={14} />
              </button>
            </span>
          ))}
        </div>

        <div className="skill-input">
          <input
            type="text"
            placeholder="New skill to learn"
            value={newLearnSkill}
            onChange={(e) => setNewLearnSkill(e.target.value)}
          />
          <button className="add-btn" onClick={handleAddLearnSkill}>Add</button>
        </div>
      </section>

      <button className="swap-btn" onClick={handleSaveSkills}>
        Save Changes
      </button>
    </motion.div>
    </div>
   
  );
};

export default MySkills;
