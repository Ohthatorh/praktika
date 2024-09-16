import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="bg-dark text-white min-vh-100">
      <Routes>
        <Route path="/" element={<ProtectedRoute onlyUnAuth={false} element={<Home />} />} /> 
        <Route path="/login" element={<ProtectedRoute onlyUnAuth={true} element={<Login />} />} />
        <Route path="/register" element={<ProtectedRoute onlyUnAuth={true} element={<Register />} />} />
      </Routes>
      <ToastContainer stacked />
    </div>
  );
}

export default App;