// Registration.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Registraion.css";

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: Save user details (in real app, hash + store in backend)
    localStorage.setItem('user', JSON.stringify({ email, password }));
    alert('✅ Registration successful!');
    navigate('/loginform');
  };

  return (
    <form onSubmit={handleRegister} className="registration-form">
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        required value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        required value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Registration;
