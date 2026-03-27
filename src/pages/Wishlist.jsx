import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const removeFromWishlist = (index) => {
    dispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: index,
    });
  };

  const moveToCart = (item, index) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: item,
    });

    dispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: index,
    });
  };

  return (
    <div className="wishlist-page">

      {/* HEADER */}
      <div className="wishlist-header">
        <h2>❤️ My Wishlist</h2>
        <Link to="/" className="continue-btn">
          ← Continue Shopping
        </Link>
      </div>

      {/* ITEMS */}
      <div className="wishlist-container">
        {wishlistItems.length === 0 ? (
          <p className="empty">Your wishlist is empty</p>
        ) : (
          wishlistItems.map((item, index) => (
            <div key={index} className="wishlist-item">

              {/* IMAGE */}
              <img src={item.image} alt={item.name} />

              {/* INFO */}
              <div className="wishlist-details">
                <h4>{item.name}</h4>
                <p>₹ {item.price}</p>
              </div>

              {/* ACTIONS */}
              <div className="actions">
                <button
                  className="cart-btn"
                  onClick={() => moveToCart(item, index)}
                >
                  Add to Cart
                </button>

                <button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(index)}
                >
                  Remove
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Wishlist;