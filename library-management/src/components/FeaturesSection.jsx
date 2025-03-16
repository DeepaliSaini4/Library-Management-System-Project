import "./FeaturesSection.css";

export default function FeaturesSection() {
  return (
    <section className="features-container">
      <h2 className="features-title">
        Explore the Essential Features of Our Library Management System
      </h2>
      <div className="features-grid">
        {/* Feature 1 */}
        <div className="feature-card">
          <div className="feature-image"></div>
          <h3>Streamlined User Experience for Efficient Library Management</h3>
          <p>
            Our system offers a comprehensive online catalog for easy book
            discovery.
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
    </section>
  );
}
