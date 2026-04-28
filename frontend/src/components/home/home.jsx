import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Sidebar from "./sidebar";
import Banner from "./banner";
import Footer from "../layout/footer.jsx"
import "./home.css";

import ProfileModal from "./ProfileModal";
function Home() {


const [matches, setMatches] = useState([]);
const [selectedMatch, setSelectedMatch] = useState(null);

useEffect(() => {
  const fetchMatches = async () => {
    const userId = localStorage.getItem("_id"); 
    const token = localStorage.getItem("token");

    if (!userId || !token) return;

    try {
      const res = await fetch(`http://localhost:8080/matches/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.error("Matches API error:", res.status, res.statusText);
        setMatches([]);
        return;
      }

      const data = await res.json();
      console.log("MATCHES FETCH:", data);
      setMatches(Array.isArray(data) ? data : []);
      
    } catch (err) {
      console.error("Failed to fetch matches:", err);
      setMatches([]);
    }
  };

  fetchMatches();
}, []);


  return (
    <div>
      <div className="home-container">
        <Header />
        <Banner />
        <div className="content">
          <Sidebar />
          <main className="main">





<div className="matches-section">
  <h2>Your Matches</h2>

 
  {matches?.length === 0 && <p>No matches found yet.
    <br />
    Check if your profile is complete, or try again later.</p>}

  <div className="matches-grid">

    {matches?.map((match, index) => (
      <motion.div
        key={match.user._id}
        className="match-card"
        onClick={() => setSelectedMatch(match)}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      >
        <img
          src={match.user.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          alt={match.user.name}
          className="match-img"
        />
        <h3>{match.user.name}</h3>
        <div className="match-details">
          <p>
            <b>Expertise:</b> {match.user.skillsToTeach?.length ? match.user.skillsToTeach.map(s => s.skillName).join(", ") : "None"}
          </p>
          <p>
            <b>Learning Goals:</b> {match.user.skillsToLearn?.length ? match.user.skillsToLearn.join(", ") : "None"}
          </p>
          <p>
            <strong>Location:</strong> {match.user.location || "Unknown"}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
  {selectedMatch && (
            <ProfileModal
              selectedMatch={selectedMatch}
              closeModal={() => setSelectedMatch(null)}
            />
          )}

</div>





          </main>
        </div>
         <Footer />
      </div>
     
    </div>
  );
}

export default Home;  