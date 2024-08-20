import React from 'react';
import Login from './auth/Login';
import SignUp from "./auth/SignUp";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
    </Router>
  );
}

export default App;
