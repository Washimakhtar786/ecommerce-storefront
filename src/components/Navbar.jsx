import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  // ✅ Redux data (safe fallback)
  const cartItems = useSelector((state) => state.cart?.items || []);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  // ✅ User
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Logout (without reload)
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <Link to="/" className="logo">MyStore</Link>

        <div className="categories">
          <span>Fashion</span>
          <span>Mobiles</span>
          <span>Beauty</span>
          <span>Electronics</span>
        </div>
      </div>

      {/* CENTER SEARCH */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for products, brands and more"
          className="search-bar"
        />
      </div>

      {/* RIGHT */}
      <div className="nav-links">

        {/* USER */}
        {user ? (
          <div className="user-section">
            <span className="user-email">{user.email}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}

        {/* MORE */}
        <span className="more">More</span>

        {/* WISHLIST */}
        <Link to="/wishlist" className="nav-icon">
          ❤️ <span>({wishlistItems.length})</span>
        </Link>

        {/* CART */}
        <Link to="/cart" className="nav-icon">
          🛒 <span>({cartItems.length})</span>
        </Link>

      </div>
    </div>
  );
}

export default Navbar;