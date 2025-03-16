import React, { useState } from 'react';
import { Link } from "react-scroll";
import './navbar.css';
import logo from "../assets/logo4.jpg";  

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home"); // Track active section

  return (
    <nav className="navbar">
      <div className="nav-links">
        <a 
          href="/" 
          className={`nav-item ${activeSection === "home" ? "active" : ""}`} 
          onClick={() => setActiveSection("home")}
        >
          Home Page
        </a>

        <Link 
          to="features" 
          smooth={true} 
          duration={500} 
          className={`nav-item ${activeSection === "about" ? "active" : ""}`} 
          onClick={() => setActiveSection("about")}
        >
          About Us
        </Link>

        <div className="dropdown">
          <a 
            href="/services" 
            className={`nav-item ${activeSection === "services" ? "active" : ""}`} 
            onClick={() => setActiveSection("services")}
          >
            Services ▾
          </a>
          <div className="dropdown-content">
            <a href="/services/service1">Service 1</a>
            <a href="/services/service2">Service 2</a>
            <a href="/services/service3">Service 3</a>
          </div>
        </div>
      </div>

      <div className="logo">
        <img src={logo} alt="Library Logo" />
      </div>

      <div className="nav-right">
        <button className="join-btn">Join</button>
      </div>
    </nav>
  );
};

export default Navbar;
