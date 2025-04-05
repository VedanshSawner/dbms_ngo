import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Simple frontend validation (optional but good practice)
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/backend/routes/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      console.log('Login response:', data); // 👈 Debugging
  
      if (response.ok) {
        // Store JWT token and user role in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
  
        // Redirect based on user role
        if (data.role === 'organizer') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        // Server responded with 400/401/etc
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to log in. Please try again later.');
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
        {error && <p className="login-error">{error}</p>}

        {/* Registration link */}
        <div className="login-register">
          <p>
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              className="register-link"
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
