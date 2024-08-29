import React, { useEffect } from "react";
import { useNavigate, BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './index.css';

// notfound ka route or add krna hai !
function AuthHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home"); // Redirect to home if token exists
    }
  }, [navigate]);

  return null; 
}

function App() {
  return (
    <div>
      <Router>
        <AuthHandler /> 
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/notfound" />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
