import React from "react";

const Header = ({ setPage }) => {
  return (
    <div className="header">
      <img
        src="/src/assets/snhuLogo.webp"
        alt="snhuLogo"
        className="snhuLogo"
      />
      <h1>SNHU E-Waste</h1>
      <div className="headerButtons">
        <button>Map</button>
        <button>Database</button>
      </div>
    </div>
  );
};

export default Header;
