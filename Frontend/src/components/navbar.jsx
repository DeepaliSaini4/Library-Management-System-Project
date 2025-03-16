import React, { useState } from 'react';
import './navbar.css';
import logo from "../assets/Logo.jpg";  


const Navbar = () => {
  const [showServices, setShowServices] = useState(false);

  const toggleServices = () => {
    setShowServices(!showServices);
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <a href="/" className="nav-item active">Home Page</a>
        <a href="/about" className="nav-item">About Us</a>
        <div className="dropdown">
          <a 
            href="/services" 
            className="nav-item" 
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}
          >
            Services ▾
          </a>
          {showServices && (
            <div 
              className="dropdown-content"
              onMouseEnter={() => setShowServices(true)}
              onMouseLeave={() => setShowServices(false)}
            >
              <a href="/services/service1">Service 1</a>
              <a href="/services/service2">Service 2</a>
              <a href="/services/service3">Service 3</a>
            </div>
          )}
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