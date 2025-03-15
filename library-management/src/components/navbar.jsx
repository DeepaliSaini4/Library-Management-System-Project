import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/services">Services</Link></li>
      </ul>
      <div className="logo">
        <img src="logo.png" alt="Library Logo" />
        <span>Library Logo</span>
      </div>
      <button className="join-btn">Join</button>
    </nav>
  );
}

export default Navbar;
