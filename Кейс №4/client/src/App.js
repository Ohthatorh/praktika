import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import SurveyForm from './components/SurveyForm';
import SurveyEditor from './components/SurveyEditor';
import SurveyResults from './components/SurveyResults';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="bg-dark text-white min-vh-100">
            <NavBar />
            <div className="container">
                <Routes>
                    <Route path="/survey/:id" element={<SurveyForm />} />
                    <Route path="/survey-results/:id" element={<SurveyResults />} />
                    <Route path="/admin" element={<SurveyEditor />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
      <ToastContainer stacked />
    </div>
  );
}

export default App;