import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('cookie') || !!localStorage.getItem('cookie2');

  const handleLogout = () => {
    if (localStorage.getItem('cookie')) localStorage.removeItem('cookie');
    if (localStorage.getItem('cookie2')) localStorage.removeItem('cookie2');
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
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{
        background: 'linear-gradient(90deg, #38ef7d 0%, #11998e 100%)',
        padding: '1rem 2rem',
      }}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold fs-3 text-white" to="/" onClick={handleNavLinkClick}>
          🌱 FoodDonate
        </NavLink>
        <button
          className="navbar-toggler"
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
            <li className="nav-item mx-2">
              <NavLink className="nav-link text-white fw-semibold" to="/home" onClick={handleNavLinkClick}>
                Home
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className="nav-link text-white fw-semibold" to="/about" onClick={handleNavLinkClick}>
                About
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className="nav-link text-white fw-semibold" to="/donate" onClick={handleNavLinkClick}>
                Donate
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className="nav-link text-white fw-semibold" to="/leaderboard" onClick={handleNavLinkClick}>
               LeaderBoard
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className="nav-link text-white fw-semibold" to="/contact" onClick={handleNavLinkClick}>
                Contact
              </NavLink>
            </li>

            {!isLoggedIn ? (
              <li className="nav-item mx-2">
                <button
                  className="btn btn-outline-light fw-bold"
                  onClick={() => {
                    navigate('/login');
                    handleNavLinkClick();
                  }}
                >
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
