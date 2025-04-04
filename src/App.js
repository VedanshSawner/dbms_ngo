import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';  // Import the Admin Dashboard
import DonationForm from './pages/Donation';  // Import Donation Form
import Receipt from './pages/Receipt';
import FirstPage from './pages/FirstPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        {/* <Route path="/FirstPage/" element={<FirstPage/>} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />  {/* Admin route */}
        <Route path="/donate" element={<DonationForm />} />  {/* Donation Form Route */}
        <Route path="/receipt/:id" element={<Receipt />} />
      </Routes>
    </Router>
  );
}

export default App;
