import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Minute Mart</h1>
      <p className="home-subtitle">Your one-stop shop for fresh groceries and more!</p>

      <ul className="menu-list">
        {/* <li><Link to="/menu" className="nav-link">📋 Menu</Link></li>
        <Link to="/" className="nav-link">🏠 Home Appliances</Link>
        <li><Link to="/veg" className="nav-link">🥦 Veggies</Link></li>
        <li><Link to="/nonveg" className="nav-link">🍗 NonVeg</Link></li>
        <Link to="/mobiles" className="nav-link">📱 Mobiles</Link>
          <Link to="/electronics" className="nav-link">⚡ Electronics</Link>
          <Link to="/cafe" className="nav-link">☕ Cafe</Link>
          <Link to="/toys" className="nav-link">🧸 Toys</Link> */}
        <li><Link to="/orders" className="nav-link">📦 Orders</Link></li>
        <li><Link to="/filter" className="nav-link">📦 Filter</Link></li>

        <li><Link to="/about" className="nav-link">ℹ️ About</Link></li>
        <li><Link to="/contact" className="nav-link">📞 Contact Us</Link></li>
         <li><Link to="/loginform" className="nav-link">🔐 Login</Link></li>
        
      </ul>
    </div>
  );
}

export default Menu;
