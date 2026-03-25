import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "../features/cart/cartSlice";

import "./Cart.css";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <h2 className="empty">🛒 Your cart is empty</h2>;
  }

  return (
    <div className="cart-page">
    <div className="cart-container">
      {/* LEFT: ITEMS */}
      <div className="cart-items">
        <h2>Shopping Cart</h2>

        {cartItems.map((item) => (
          <div key={item.id} className="cart-card">
            <img src={item.image} alt={item.name} />

            <div className="details">
              <h3>{item.name}</h3>
              <p className="price">${item.price}</p>

              <div className="qty">
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity - 1,
                      })
                    )
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                >
                  +
                </button>
              </div>

              <button
                className="remove"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT: SUMMARY */}
      <div className="summary">
        <h3>Order Summary</h3>

        <p>Total Items: {cartItems.length}</p>
        <h2>Total: ${total}</h2>

        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
    </div>
  );
}

export default Cart;