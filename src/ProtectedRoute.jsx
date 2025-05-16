// ProtectedRoute.jsx
// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isSignedIn } from './store';

const ProtectedRoute = ({ children }) => {
  return isSignedIn() ? children : <Navigate to="/loginform" />;
};

export default ProtectedRoute;
