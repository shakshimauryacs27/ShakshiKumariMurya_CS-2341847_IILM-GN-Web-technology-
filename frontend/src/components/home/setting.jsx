import React, { useState, useEffect } from "react";
import Header from "./Header";
const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [username, setUsername] = useState("");

  // Load saved settings
  useEffect(() => {
    const savedDark = localStorage.getItem("darkMode") === "true";
    const savedNotif = localStorage.getItem("notifications") !== "false";
    const savedName = localStorage.getItem("username") || "";

    setDarkMode(savedDark);
    setNotifications(savedNotif);
    setUsername(savedName);
  }, []);

  // Save settings
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    localStorage.setItem("notifications", notifications);
    localStorage.setItem("username", username);
  }, [darkMode, notifications, username]);

  return (
    <div>
      <Header />
      <div
        style={{
          padding: "20px",
          background: darkMode ? "#121212" : "#f5f5f5",
          color: darkMode ? "#fff" : "#000",
          minHeight: "100vh",
        }}
      >
        <h1>Settings ⚙️</h1>

      <div style={{ marginTop: "20px" }}>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Enable Dark Mode
        </label>
      </div>

      <div style={{ marginTop: "20px" }}>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          Enable Notifications
        </label>
      </div>

      <div style={{ marginTop: "20px" }}>
        <label>Username:</label>
        <br />
        <input
          type="text"
          value={username}
          placeholder="Enter your name"
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          style={{
            padding: "10px 15px",
            background: "red",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Reset Settings
        </button>
      </div>
    </div>
  </div>
  );
};

export default Settings;