import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">

      {/* LEFT: LOGO + CATEGORIES */}
      <div className="nav-left">
        <div className="logo">MyStore</div>

        <div className="categories">
          <span>Fashion</span>
          <span>Mobiles</span>
          <span>Beauty</span>
          <span>Electronics</span>
        </div>
      </div>

      {/* CENTER: SEARCH */}
      <input
        type="text"
        placeholder="Search for products, brands and more"
        className="search-bar"
      />

      {/* RIGHT */}
      <div className="nav-links">
        <span>Login</span>
        <span>More</span>
        <Link to="/cart">Cart</Link>
      </div>
    </div>
  );
}

export default Navbar;