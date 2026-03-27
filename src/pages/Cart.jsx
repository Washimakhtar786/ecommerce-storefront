import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const removeFromCart = (index) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: index,
    });
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-page">

      {/* HEADER */}
      <div className="cart-header">
        <h2>🛒 My Cart</h2>
        <Link to="/" className="continue-btn">
          ← Continue Shopping
        </Link>
      </div>

      {/* CART ITEMS */}
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <p className="empty">Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">

              {/* IMAGE */}
              <img src={item.image} alt={item.name} />

              {/* INFO */}
              <div className="cart-details">
                <h4>{item.name}</h4>
                <p>₹ {item.price}</p>
              </div>

              {/* REMOVE */}
              <button
                className="remove-btn"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* TOTAL */}
      {cartItems.length > 0 && (
        <>
          <h3 className="total">
            Total: ₹ {total.toFixed(2)}
          </h3>

          <button className="buy-btn">Buy Now</button>
        </>
      )}
    </div>
  );
}

export default Cart;