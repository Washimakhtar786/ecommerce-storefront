import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [search, setSearch] = useState("");

  return (
    <nav className="navbar">
      <div className="logo"><Link to="/">MyStore</Link></div>

      <input
        type="text"
        placeholder="Search products..."
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="nav-links">
        <li><Link to="/">Catalog</Link></li>
        <li><Link to="/cart">Cart ({cartItems.length})</Link></li>
        <li><Link to="/wishlist">Wishlist ({wishlistItems.length})</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;