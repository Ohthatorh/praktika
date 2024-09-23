import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <div className="bg-dark text-white min-vh-100">
    <Routes>
      <Route path="/" element={<ProtectedRoute onlyUnAuth={false} element={<Dashboard />} />} />
      <Route path="/login" element={<ProtectedRoute onlyUnAuth={true} element={<Login />} />} />
      <Route path="/register" element={<ProtectedRoute onlyUnAuth={true} element={<Register />} />} />
    </Routes>
  </div>
  )
}

export default App;
