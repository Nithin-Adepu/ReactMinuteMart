// Checkout.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './checkout.css';

function Checkout() {
  const orders = useSelector((state) => state.orders);
  const navigate = useNavigate();

  if (!orders.length) {
    return (
      <div className="checkout-container">
        <h2>No orders found.</h2>
        <button onClick={() => navigate('/')}>Go Back to Shop</button>
      </div>
    );
  }

  const latestOrder = orders[orders.length - 1];

  return (
    <div className="checkout-container">
      <h2>🎉 Order Confirmation</h2>
      <p>Thank you for your purchase! Your order has been placed successfully.</p>
      <div className="order-summary">
        <h3>Order ID: {latestOrder.orderId}</h3>
        <p><strong>Date:</strong> {latestOrder.date}</p>
        <p><strong>Payment Method:</strong> {latestOrder.paymentMethod}</p>
        <h4>Items:</h4>
        <ul>
          {latestOrder.items.map((item, index) => (
            <li key={index}>
              {item.name} × {item.quantity} - ₹{(item.Price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <h4>Total Paid: ₹{latestOrder.finalPrice}</h4>
      </div>
      <button onClick={() => navigate('/orders')} className="orders-btn">
        View My Orders
      </button>
    </div>
  );
}

export default Checkout;
