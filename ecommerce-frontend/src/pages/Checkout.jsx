import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

const API_URL =
  "https://creative-generosity-production-b9fb.up.railway.app/api";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handlePlaceOrder = async () => {
    if (!name || !email || !address) {
      alert("Please fill all the fields");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      name: name,
      email: email,
      address: address,
      paymentMethod: paymentMethod,
      total: totalPrice,
      orderDate: new Date().toISOString(),
      items: cartItems.map(function (item) {
        return {
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
        };
      }),
    };

    try {
      await axios.post(API_URL + "/orders", orderData);
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      setCartItems([]);
      navigate("/");
    } catch (err) {
      alert("Order failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="checkout-container">
      <h2>
        Your Order Details
        <span className="checkout-action"> - Confirm & Pay</span>
      </h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div>
          <div className="cart-summary">
            <h3>Cart Items</h3>

            {cartItems.map(function (item, index) {
              return (
                <div className="cart-item" key={index}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="checkout-image"
                  />
                  <div className="cart-details">
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>
                    <p>Qty: {item.quantity || 1}</p>
                  </div>
                </div>
              );
            })}

            <h3 className="total-price">Total: ₹{totalPrice}</h3>
          </div>

          <div className="checkout-form">
            <h3>Shipping Details</h3>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <textarea
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="cod">Cash on Delivery</option>
              <option value="upi">UPI</option>
            </select>

            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
