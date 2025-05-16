import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './orders.css';

function Orders() {
  const orders = useSelector((state) => state.orders);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleExpand = (index) => {
    setExpandedOrder((prev) => (prev === index ? null : index));
  };

  const calculateFinalAmount = (order) => {
    const total = order.items.reduce((sum, item) => sum + item.Price * item.quantity, 0);
    const discount = order.discount || 0;
    const tax = ((total - discount) * 0.05);
    return (total - discount + tax).toFixed(2);
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">📜 My Orders</h2>

      {orders.length === 0 ? (
        <p className="empty-message">You haven't placed any orders yet.</p>
      ) : (
        <div className="order-cards">
          {orders.map((order, index) => (
            <div className="order-card" key={index}>
              <div className="order-header" onClick={() => toggleExpand(index)}>
                <h4>Order #{index + 1}</h4>
                <span>{order.date}</span>
                <button className="expand-btn">
                  {expandedOrder === index ? '▲ Hide' : '▼ Show'}
                </button>
              </div>

              {expandedOrder === index && (
                <div className="order-body">
                  <p><strong>Order ID:</strong> {order.orderId}</p>
                  {order.email && <p><strong>Email:</strong> {order.email}</p>}
                  {order.paymentMethod && <p><strong>Payment Method:</strong> {order.paymentMethod}</p>}
                  {order.status && <p><strong>Status:</strong> {order.status}</p>}
                  {order.couponCode && <p><strong>Coupon Used:</strong> {order.couponCode}</p>}

                  {order.items.map((item, i) => (
                    <div className="order-item" key={i}>
                      <img src={item.image} alt={item.name} className="item-image" />
                      <div className="item-info">
                        <p><strong>{item.name}</strong></p>
                        <p>Price: ₹{item.Price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Total: ₹{(item.Price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}

                  <div className="order-footer">
                    <p>
                    <h4>Tax: ₹{order.tax || ((order.items.reduce((sum, item) => sum + item.Price * item.quantity, 0) * 0.05).toFixed(2))}</h4>
                    <h4>Total Paid: ₹{order.finalAmount ? Number(order.finalAmount).toFixed(2) : calculateFinalAmount(order)}</h4>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
