import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: '#000', // Pure black background
        padding: '2rem 1rem',
        color: '#00ffcc', // Neon blue-green
      }}
    >
      <div className="container">
        <div className="row justify-content-between align-items-start">
          {/* Logo + Description */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold" style={{ color: '#00ffb7' }}>🧠 BrainBuildr</h4>
            <p style={{ color: '#aaffee' }}>
              Empowering learners to build, innovate, and explore hands-on with AI-powered project generation.
            </p>
          </div>

          {/* Explore Links */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold" style={{ color: '#00c9ff' }}>Explore</h5>
            <ul className="list-unstyled">
              {['home', 'login', 'signup', 'project', 'roadmap'].map((link, i) => (
                <li key={i}>
                  <NavLink
                    to={`/${link}`}
                    className="footer-link text-decoration-none d-block mb-1"
                    style={{ color: '#aaffee' }}
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons */}
          <div className="col-md-4 text-md-end">
            <h5 className="fw-bold" style={{ color: '#00c9ff' }}>Connect with Us</h5>
            <div className="d-flex gap-3 justify-content-md-end mt-2">
              {['facebook-f', 'twitter', 'instagram', 'linkedin-in'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="fs-5"
                  style={{ color: '#aaffee' }}
                >
                  <i className={`fab fa-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: '#00ffb7' }} />
        <div className="text-center" style={{ color: '#66ffe3' }}>
          <small>&copy; {new Date().getFullYear()} BrainBuildr. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
