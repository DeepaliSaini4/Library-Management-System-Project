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

        <a 
          href="/catalogue" 
          className={`nav-item ${activeSection === "catalogue" ? "active" : ""}`} 
          onClick={() => setActiveSection("catalogue")}
        >
          Book Catalogue
        </a>

        <a 
          href="/contact" 
          className={`nav-item ${activeSection === "contact" ? "active" : ""}`} 
          onClick={() => setActiveSection("contact")}
        >
          Contact Us
        </a>
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
