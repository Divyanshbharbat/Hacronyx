import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('cookie') || !!localStorage.getItem('cookie2');

  const handleLogout = () => {
    localStorage.removeItem('cookie');
    localStorage.removeItem('cookie2');
    navigate('/');
  };

  const handleNavLinkClick = () => {
    const navbar = document.getElementById('navbarNav');
    if (navbar && navbar.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbar, { toggle: true });
      bsCollapse.hide();
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow"
      style={{
        background: 'linear-gradient(90deg, #0e2148, #483aa0)',
        padding: '1rem 2rem',
      }}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold fs-3 text-warning" to="/" onClick={handleNavLinkClick}>
          🧠 BrainBuildr
        </NavLink>
        <button
          className="navbar-toggler navbar-dark"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {['home', 'about', 'projects', 'contact'].map((route, i) => (
              <li className="nav-item mx-2" key={i}>
                <NavLink className="nav-link text-light fw-semibold" to={`/${route}`} onClick={handleNavLinkClick}>
                  {route.charAt(0).toUpperCase() + route.slice(1)}
                </NavLink>
              </li>
            ))}

            {!isLoggedIn ? (
              <li className="nav-item mx-2">
                <button className="btn btn-outline-warning fw-bold" onClick={() => navigate('/login')}>
                  Login
                </button>
              </li>
            ) : (
              <li className="nav-item mx-2">
                <button className="btn btn-danger fw-bold" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
