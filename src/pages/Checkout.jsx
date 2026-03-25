import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Checkout.css";

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const [form, setForm] = useState({ name: "", address: "", payment: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); alert("Order placed! Thank you."); }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <select name="payment" value={form.payment} onChange={handleChange} required>
          <option value="">Select Payment</option>
          <option value="card">Card</option>
          <option value="cod">Cash on Delivery</option>
        </select>
        <button type="submit">Place Order</button>
      </form>

      <h2>Order Summary</h2>
      {cartItems.map((i) => <div key={i.id}>{i.name} x {i.quantity} - ${i.price*i.quantity}</div>)}
      <p>Total: ${total}</p>
    </div>
  );
}

export default Checkout;