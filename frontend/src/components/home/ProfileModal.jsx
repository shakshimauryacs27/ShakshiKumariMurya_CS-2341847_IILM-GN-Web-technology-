import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./home.css";

function ProfileModal({ selectedMatch, closeModal }) {
  const navigate = useNavigate();

  if (!selectedMatch) return null;

  const user = selectedMatch.user;

  const handleChatClick = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("_id");

    if (!token || !userId) {
      alert("Please log in to chat");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/chat/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipientId: user._id }),
      });

      if (res.ok) {
        const conversation = await res.json();
        navigate(`/messages?conversationId=${conversation._id}`);
        closeModal();
      } else {
        alert("Failed to start chat");
      }
    } catch (error) {
      console.error("Chat error:", error);
      alert("Error starting chat");
    }
  };

  return (
    <div className="profile-overlay">
      <div className="profile-modal">
        <button className="close-btn" onClick={closeModal}>
          <AiOutlineClose size={14} />
        </button>

        <h2>{user.name}</h2>
        {user.bio && (
          <p>
            <strong>Bio:</strong> {user.bio}
          </p>
        )}

        <p><strong>Location:</strong> {user.location || "Unknown"}</p>

        <p>
          <strong>Expertise:</strong>{" "}
          {user.skillsToTeach?.length
            ? user.skillsToTeach.map(s => s.skillName).join(", ")
            : "None"}
        </p>

        <p>
          <strong>Learning Goals:</strong>{" "}
          {user.skillsToLearn?.length
            ? user.skillsToLearn.join(", ")
            : "None"}
        </p>

        {user.portfolio && (
          <p>
            <strong>Portfolio:</strong>{" "}
            <a href={user.portfolio} target="_blank" rel="noopener noreferrer">
              {user.portfolio}
            </a>
          </p>
        )}

        <button className="chat-btn" onClick={handleChatClick}>
          Chat with {user.name}
        </button>
      </div>
    </div>
  );
}

export default ProfileModal;

