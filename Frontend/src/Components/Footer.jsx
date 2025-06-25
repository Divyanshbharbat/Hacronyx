import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: 'rgb(14, 33, 72)',
        padding: '2rem 1rem',
        color: 'rgb(227,208,149)',
      }}
    >
      <div className="container">
        <div className="row justify-content-between align-items-start">
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold text-warning">🧠 BrainBuildr</h4>
            <p className="text-light">
              Empowering learners to build, innovate, and explore hands-on with AI-powered project generation.
            </p>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-bold text-warning">Quick Links</h5>
            <ul className="list-unstyled">
              {['home', 'login', 'signup', 'about', 'projects'].map((link, i) => (
                <li key={i}>
                  <NavLink
                    to={`/${link}`}
                    className="footer-link text-decoration-none text-light d-block mb-1"
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-4 text-md-end">
            <h5 className="fw-bold text-warning">Connect with Us</h5>
            <div className="d-flex gap-3 justify-content-md-end mt-2">
              {['facebook-f', 'twitter', 'instagram', 'linkedin-in'].map((icon, i) => (
                <a key={i} href="#" className="text-light fs-5">
                  <i className={`fab fa-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-4 border-light" />
        <div className="text-center text-light">
          <small>&copy; {new Date().getFullYear()} BrainBuildr. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
