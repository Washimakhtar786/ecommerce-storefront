import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import "./Wishlist.css";

function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className="wishlist-page">
    <div className="wishlist-container">
      <h1>Wishlist</h1>
      {wishlistItems.length === 0 && <p>No items in wishlist</p>}
      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div key={item.id} className="wishlist-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <button onClick={() => dispatch(removeFromWishlist(item.id))}>Remove</button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Wishlist;