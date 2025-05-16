import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registraion.css';

function Registration() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('❌ Passwords do not match!');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const emailExists = existingUsers.some(user => user.email === email);
    if (emailExists) {
      alert('⚠️ Email already registered!');
      return;
    }

    const newUser = { fullName, email, phone, gender, dob, password };
    existingUsers.push(newUser);

    localStorage.setItem('users', JSON.stringify(existingUsers));
    alert('✅ Registration successful!');
    navigate('/loginform');
  };

  return (
    <form onSubmit={handleRegister} className="registration-form">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Full Name"
        required
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Phone Number"
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <select
        required
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input
        type="date"
        placeholder="Date of Birth"
        required
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Registration;
