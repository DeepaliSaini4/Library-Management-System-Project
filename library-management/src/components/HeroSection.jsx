import React from "react";
import "./HeroSection.css"; 


const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">BookHive</h1>
        <p className="hero-description">
        Step into BookHive, the ultimate sanctuary for book lovers and knowledge seekers. A seamless, beautifully crafted Library Management System that blends efficiency with elegance. 
        </p>
        <div className="hero-buttons">
          <button className="primary-btn">Learn More</button>
          <button className="secondary-btn">Sign Up</button>
        </div>
      </div>
  
    </div>
  );
};

export default HeroSection;
