import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  IncCart, DecCart, RemoveFromCart, AddOrder, ClearCart
} from './store';
import QRCode from 'react-qr-code';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import './cart.css';

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const isSignedIn = useSelector((state) => state.user.isSignedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [redirectMessage, setRedirectMessage] = useState('');
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const emailRef = useRef('');
  const validCoupons = { NITHIN10: 10, NITHIN20: 20, NITHIN30: 30 };
  const taxRate = 5;

  useEffect(() => {
    const savedEmails = JSON.parse(localStorage.getItem('previousEmails')) || [];
    setEmailSuggestions(savedEmails);
  }, []);

  const handleEmailChange = (e) => {
    const input = e.target.value;
    setCustomerEmail(input);

    const savedEmails = JSON.parse(localStorage.getItem('previousEmails')) || [];
    const filtered = savedEmails.filter(email => email.includes(input));
    setEmailSuggestions(filtered);
  };

  const handleEmailFocus = () => {
    const savedEmails = JSON.parse(localStorage.getItem('previousEmails')) || [];
    setEmailSuggestions(savedEmails);
    setShowSuggestions(true);
  };

  const handleEmailBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200); // allow click to register
  };

  const handleSuggestionClick = (email) => {
    setCustomerEmail(email);
    setShowSuggestions(false);
  };

  const saveEmailToHistory = (email) => {
    let savedEmails = JSON.parse(localStorage.getItem('previousEmails')) || [];
    if (!savedEmails.includes(email)) {
      savedEmails.push(email);
      localStorage.setItem('previousEmails', JSON.stringify(savedEmails));
    }
  };

  const handleApplyCoupon = () => {
    const code = couponInput.toUpperCase();
    if (validCoupons[code]) {
      setDiscountPercentage(validCoupons[code]);
      setCouponMessage(`Coupon ${code} applied! ✅`);
      toast.success(`Coupon ${code} applied! ✅`);
    } else {
      setDiscountPercentage(0);
      setCouponMessage('❌ Invalid coupon code');
      toast.error('❌ Invalid coupon code');
    }
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);
  const discount = totalAmount * (discountPercentage / 100);
  const subtotalAfterDiscount = totalAmount - discount;
  const taxAmount = subtotalAfterDiscount * (taxRate / 100);
  const finalAmount = subtotalAfterDiscount + taxAmount;

  const sendEmail = (purchaseDetails) => {
    const orderItems = purchaseDetails.items.map((item) => ({
      name: item.name,
      units: item.quantity,
      price: (item.Price * item.quantity).toFixed(2),
      image_url: item.image,
    }));

    const templateParams = {
      order_id: purchaseDetails.orderId,
      email: customerEmail,
      orders: orderItems,
      cost: {
        shipping: "50.00",
        tax: taxAmount.toFixed(2),
        total: finalAmount.toFixed(2),
      },
    };

    emailjs.send(
      'service_w4f3eyi',
      'template_t3r6vms',
      templateParams,
      'TFOepQrUvl6rBLfd_'
    )
      .then((response) => {
        console.log('✅ Email sent successfully:', response.status, response.text);
        toast.success('✅ Order confirmation email sent!');
      })
      .catch((error) => {
        console.error('❌ Failed to send email:', error);
        toast.error('❌ Failed to send confirmation email');
      });
  };

  const handlePurchase = () => {
    if (!isSignedIn) {
      toast.warning('⚠️ Please sign in to continue!');
      navigate('/loginform?redirect=/cart');
      return;
    }

    if (!paymentMethod || !paymentConfirmed) {
      toast.error('❌ Please choose and confirm your payment method.');
      return;
    }

    if (!customerEmail) {
      toast.error('❌ Please enter your email before purchasing.');
      return;
    }

    saveEmailToHistory(customerEmail);

    const orderId = 'ORD-' + Date.now();
    const purchaseDetails = {
      orderId,
      date: new Date().toLocaleString(),
      items: [...cartItems],
      finalPrice: finalAmount.toFixed(2),
      email: customerEmail,
      paymentMethod,
    };

    dispatch(AddOrder(purchaseDetails));
    sendEmail(purchaseDetails);

    toast.success('✅ Order placed successfully!');
    dispatch(ClearCart());
    setRedirectMessage('🔄 Redirecting to Orders...');
    setTimeout(() => navigate('/orders'), 2000);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>

      {redirectMessage && <p className="purchase-message">{redirectMessage}</p>}

      <ul className="cart-list">
        {cartItems.length === 0 ? (
          <li className="empty-cart">Your cart is empty.</li>
        ) : (
          cartItems.map((item) => (
            <li key={item.name} className="cart-item-card">
              <img src={item.image} alt={item.name} className="cart-image" />
              <div>
                <h4>{item.name}</h4>
                <p>Price: ₹{item.Price}</p>
                <p>Quantity: {item.quantity}</p>
                <div className="cart-buttons">
                  <button onClick={() => dispatch(DecCart(item))}>−</button>
                  <button onClick={() => dispatch(IncCart(item))}>+</button>
                  <button onClick={() => dispatch(RemoveFromCart(item))}>Remove</button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      {cartItems.length > 0 && (
        <div className="price-details-box">
          <div className="coupon-code-section">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Enter coupon (e.g. NITHIN10)"
            />
            <button onClick={handleApplyCoupon}>Apply</button>
            <p className={`coupon-message ${couponMessage.includes('✅') ? 'success' : 'error'}`}>
              {couponMessage}
            </p>
          </div>

          <div className="price-details">
            <h4>Total: ₹{totalAmount.toFixed(2)}</h4>
            <h4>Discount: ₹{discount.toFixed(2)}</h4>
            <h4>Tax: ₹{taxAmount.toFixed(2)}</h4>
            <h3>Final: ₹{finalAmount.toFixed(2)}</h3>
          </div>

          {/* Email input with auto-suggestions */}
          <div className="email-autocomplete-wrapper">
            <input
              type="email"
              ref={emailRef}
              value={customerEmail}
              onChange={handleEmailChange}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              className="form-control"
              placeholder="you@example.com"
              required
              autoComplete="off"
            />
            {showSuggestions && emailSuggestions.length > 0 && (
              <ul className="email-suggestions-list">
                {emailSuggestions.map((email, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(email)}>
                    {email}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="payment-methods">
            <h4>Choose Payment</h4>
            <button onClick={() => setPaymentMethod('UPI')}>UPI</button>
            <button onClick={() => setPaymentMethod('Card')}>Card</button>
            <button onClick={() => setPaymentMethod('Wallet')}>Wallet</button>
            {paymentMethod && <p>Selected: {paymentMethod}</p>}
          </div>

          {paymentMethod === 'UPI' && (
            <>
              <QRCode value={`upi://pay?pa=example@upi&am=${finalAmount.toFixed(2)}&cu=INR`} />
              <label>
                <input
                  type="checkbox"
                  checked={paymentConfirmed}
                  onChange={(e) => setPaymentConfirmed(e.target.checked)}
                />
                I have completed payment
              </label>
            </>
          )}

          <button
            className="purchase-btn"
            onClick={handlePurchase}
            disabled={!paymentConfirmed}
          >
            Complete Purchase
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
