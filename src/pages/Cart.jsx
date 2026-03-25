import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import "./Cart.css";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {cartItems.length === 0 && <p>Your cart is empty</p>}
      {cartItems.map((i) => (
        <div key={i.id} className="cart-item">
          <img src={i.image} alt={i.name} />
          <div>
            <h3>{i.name}</h3>
            <p>${i.price}</p>
            <input type="number" min="1" value={i.quantity} onChange={(e) => dispatch(updateQuantity({id:i.id, quantity:parseInt(e.target.value)}))} />
            <button onClick={() => dispatch(removeFromCart(i.id))}>Remove</button>
          </div>
        </div>
      ))}
      <h2>Total: ${total}</h2>
    </div>
  );
}

export default Cart;