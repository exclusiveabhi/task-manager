import React from 'react';
import Login from './auth/Login';
import SignUp from "./auth/SignUp";
import Home from "./pages/Home"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// notfound ka route or add krna hai !
function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/home'  element={<Home></Home>}/>
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
    </Router>
    <ToastContainer/>
    </div>
  );
}

export default App;
