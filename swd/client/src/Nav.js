// Nav.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css"; // Zaimportuj plik stylów

const Nav = () => {
  const location = useLocation();

  return (
    <div className="nav-container">
      <Link to="/create-survey">
        <div className={`nav-dot ${location.pathname === "/survey-creator" ? "active" : ""}`} />
      </Link>
      <div className="nav-space" />
      <Link to="/">
        <div className={`nav-dot ${location.pathname === "/survey" ? "active" : ""}`} />
      </Link>
      <div className="nav-space" />
      <Link to="/results">
        <div className={`nav-dot ${location.pathname === "/results" ? "active" : ""}`} />
      </Link>
    </div>
  );
};

export default Nav;
