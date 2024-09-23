import React from 'react';
import {  Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function ProtectedRoute({ element, onlyUnAuth = false }) {
  const {isAuthenticated} = useAuth();
  const isLoggedIn = localStorage.getItem('token') || false;
  const location = useLocation();
  const from = location.state?.from || "/";
  if (onlyUnAuth && isLoggedIn && isAuthenticated) {
    return <Navigate to={from} />;
  }
  if (!onlyUnAuth && !isLoggedIn && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return element;
}

export default ProtectedRoute;