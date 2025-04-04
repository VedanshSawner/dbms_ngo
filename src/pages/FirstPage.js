import React from 'react';
import './FirstPage.css';
import { useNavigate } from 'react-router-dom';
import Photo1 from './Assests/Photo1.webp';
import Photo2 from './Assests/Photo2.jpg';
import Photo3 from './Assests/Photo3.jpg';
import Photo4 from './Assests/Photo4.jpg';
import Photo5 from './Assests/Photo5.jpg';
import Photo6 from './Assests/Photo6.jpg';
const FirstPage = () => {
  const navigate = useNavigate();
  // Updated image paths (Ensure they exist in the public/assets/ folder)
  const photos = [
    { id: 1, src: Photo1, alt: '' },
    { id: 2, src: Photo2, alt: '' },
    { id: 3, src: Photo3, alt: '' },
    { id: 4, src: Photo4, alt: '' },
    { id: 5, src: Photo5, alt: '' },
    { id: 6, src: Photo6, alt: '' }
  ];

  return (
    <div className="simple-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
        <img src={require('./Assests/logo.png')} alt="NGO Logo" className="logo-img" />
          <span>Aryan Daan Bhava</span>
        </div>

        <div className="nav-buttons">
          <button className="login-btn" onClick={() => navigate('/login')}>
            Login
          </button>
          <button className="register-btn" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </nav>

      {/* Photo Gallery */}
      <div className="photo-gallery">
        <h2>Our Work in Pictures</h2>
        <div className="photos-container">
          {photos.map((photo) => (
            <div key={photo.id} className="photo-card">
              <img 
                src={photo.src} 
                alt={photo.alt}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder.jpg'; // Ensure this placeholder exists
                }}
              />
              <p>{photo.alt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirstPage;