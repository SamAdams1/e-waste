import React from 'react';
// import './About.css'; // Optional: Add styles for the component

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="video-container">
        <video autoPlay loop muted className="background-video">
          <source src="src\assets\ewaste_b_roll.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="content-container">
        <section className="about-section">
          <h2>Our Team</h2>
          <p>We are a group of passionate individuals dedicated to making a difference in the world of e-waste management.</p>
        </section>
        <section className="about-section">
          <h2>Our Goal</h2>
          <p>Our mission is to reduce electronic waste and promote sustainable practices for a cleaner planet.</p>
        </section>
        <section className="about-section">
          <h2>Our Product</h2>
          <p>We provide innovative solutions to recycle and repurpose electronic devices responsibly.</p>
        </section>
      </div>
    </div>
  );
};

export default About;