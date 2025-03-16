import bgImage from "../assets/bg.jpg";
import "./FeaturesSection.css";

export default function FeaturesSection() {
  return (
    <section
      id="features" 
      className="features-container full-screen"
      
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="features-content">
        <div className="title-container">
          <h1 className="features-title">
            Dive into the Future of Libraries with Our Exciting Management System!
          </h1>
        </div>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-image"></div>
            <h3>Streamlined User Experience for Efficient Library Management</h3>
            <p>
              Our system offers a comprehensive online catalog for easy book discovery.
            </p>
            <a href="#" className="feature-link">
              Learn More &rarr;
            </a>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-image"></div>
            <h3>Effortless User Management for Libraries of All Sizes</h3>
            <p>Manage user accounts seamlessly with our intuitive interface.</p>
            <a href="#" className="feature-link">
              Sign Up &rarr;
            </a>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-image"></div>
            <h3>Convenient Book Reservation System for All Users</h3>
            <p>Reserve books easily and receive notifications for pick-up.</p>
            <a href="#" className="feature-link">
              Reserve &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
