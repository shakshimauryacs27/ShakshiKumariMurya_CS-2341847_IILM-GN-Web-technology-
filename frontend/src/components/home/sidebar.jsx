import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom"; 
import "./home.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button
        className="sidebar-toggle"
        type="button"
        aria-label="Toggle dashboard menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
      </button>
      <div
        className={`sidebar-backdrop ${isOpen ? "show" : ""}`}
        onClick={closeSidebar}
      ></div>
      <motion.aside
        className={`sidebar ${isOpen ? "open" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <ul>
          <li>
            <NavLink
              to="/home"
              onClick={closeSidebar}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <i className="fa-solid fa-circle-user"></i> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/discover"
              onClick={closeSidebar}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <i className="fa-solid fa-magnifying-glass"></i> Discover Skills
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-skills"
              onClick={closeSidebar}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <i className="fa-solid fa-bars"></i> My Skills
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/messages"
              onClick={closeSidebar}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <i className="fa-solid fa-comment"></i> Messages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              onClick={closeSidebar}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <i className="fa-solid fa-sun"></i> Settings
            </NavLink>
          </li>
        </ul>
      </motion.aside>
    </>
  );
};

export default Sidebar;
