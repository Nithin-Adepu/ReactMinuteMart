// App.js

import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Veg from "./Veg";
import Nonveg from "./Nonveg";
import Cart from "./Cart";
import Menu from "./Menu";
import Mobiles from "./Mobiles";
import Electronics from "./Electronics";
import Cafe from "./Cafe";
import Toys from "./Toys";
import Home from "./Home";
import Orders from "./Orders";
import LoginForm from "./LoginForm";
import Registration from "./Registration";
import Checkout from "./Checkout";
import ProtectedRoute from "./ProtectedRoute";

import "./App.css";

// Dummy components
const About = () => <div className="page">📄 About Us</div>;
const ContactUs = () => <div className="page">📞 Contact Us</div>;

function App() {
  const cartItems = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <BrowserRouter>
      <header>
        <div className="logo-bar">
          <div className="logo">📦 Minute Store</div>
          <ToastContainer
    position="top-center"
    autoClose={1500}
    hideProgressBar={false}
    closeOnClick
    pauseOnHover
    draggable
    theme="dark"
  />
        </div>
        <nav className="nav-bar">
          <ul className="nav-links">
            <li><Link to="/menu" className="nav-link">📋 Menu</Link></li>
            <li><Link to="/home" className="nav-link">🏠 Home Appliances</Link></li>
            <li><Link to="/veg" className="nav-link">🥦 Veggies</Link></li>
            <li><Link to="/nonveg" className="nav-link">🍗 NonVeg</Link></li>
            <li><Link to="/mobiles" className="nav-link">📱 Mobiles</Link></li>
            <li><Link to="/electronics" className="nav-link">⚡ Electronics</Link></li>
            <li><Link to="/cafe" className="nav-link">☕ Cafe</Link></li>
            <li><Link to="/toys" className="nav-link">🧸 Toys</Link></li>
            <li><Link to="/loginform" className="nav-link">🔐 Login</Link></li>
            <li>
              <Link to="/cart" className="nav-link cart-link">
                🛒 Cart
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          {/* Redirect root path to login page */}
          {/* <Route path="/" element={<Navigate to="/loginform" replace />} /> */}

          <Route path="/menu" element={<Menu />} />
          <Route path="/home" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<Nonveg />} />
          <Route path="/mobiles" element={<Mobiles />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/cafe" element={<Cafe />} />
          <Route path="/toys" element={<Toys />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/loginform" element={<LoginForm />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/orders" element={<Orders />} />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; 2025 MinuteMart Store. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/terms" className="footer-link">Terms of Service</Link>
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
