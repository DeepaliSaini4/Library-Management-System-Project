import React from "react";
import "./HeroSection.css"; 
import heroImage from "../assets/bookpic.jpg"; 


const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">BOOKHIVE</h1>
        <p className="hero-description">
          Step into BookHive, the ultimate sanctuary for book lovers and knowledge seekers. 
          A seamless, beautifully crafted Library Management System that blends efficiency with elegance.
        </p>
        <div className="hero-buttons">
          <button className="secondary-btn">Sign Up</button>
      </div>
      </div>

      {/* Added Image Container */}
      <div className="hero-image">
        <img src={heroImage} alt="Library" />
      </div>
    </div>
  );
};

export default HeroSection;
