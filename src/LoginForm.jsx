import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './store';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import the CSS

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    dispatch(login({ email }));
    navigate('/cart');
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Log In</button>
        </form>
        <div className="signup">
          New user? <a href="/register">Create New Account</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
