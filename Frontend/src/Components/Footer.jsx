import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row justify-content-between align-items-start">
          {/* Brand Info */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h4 className="fw-bold text-white">FoodDonate</h4>
            <p className="text-light">
              Bridging hunger gaps with every donation. Join hands to build a zero-food-waste world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="fw-bold text-white">Quick Links</h5>
            <ul className="list-unstyled">
              <li><NavLink to="/home" className="footer-link">Home</NavLink></li>
              <li><NavLink to="/login" className="footer-link">Login</NavLink></li>
              <li><NavLink to="/signup" className="footer-link">Signup</NavLink></li>
              <li><NavLink to="/adminlogin" className="footer-link">Admin</NavLink></li>
              <li><NavLink to="/leaderboard" className="footer-link">Leaderboard</NavLink></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 text-md-end">
            <h5 className="fw-bold text-white">Connect with us</h5>
            <div className="d-flex gap-3 justify-content-md-end justify-content-start mt-2">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
        <div className="text-center text-light">
          <small>&copy; {new Date().getFullYear()} FoodDonate. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
