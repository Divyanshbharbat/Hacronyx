import React, { useEffect, useRef, useState } from 'react';
import {
  User, Settings, CreditCard, FileText, Users, LogOut
} from 'lucide-react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const ProfileDropdown = ({ isOpen, onClose, token }) => {
  const dropdownRef = useRef(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_APP}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserInfo(res.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setLoading(false);
      }
    };
    if (isOpen && token) fetchUserInfo();
  }, [isOpen, token]);

  const handleLogout = () => {
    localStorage.removeItem('cookie');
    window.location.href = '/login';
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="position-absolute top-100 end-0 mt-2 shadow rounded-4 border"
      style={{
        width: '280px',
        zIndex: 1055,
        background: 'linear-gradient(145deg, #0f2027, #203a43, #2c5364)',
        color: '#f1f1f1',
        borderColor: '#1e3c52',
      }}
    >
      <Toaster />

      {/* User Info or Login */}
      <div className="text-center px-3 pt-3 pb-2 border-bottom border-secondary">
        {!token ? (
          <>
            <div className="text-light small">You're not logged in</div>
            <button
              onClick={() => {
                toast('Redirecting to login...');
                navigate('/login');
              }}
              className="btn btn-success btn-sm mt-2"
            >
              Login
            </button>
          </>
        ) : loading ? (
          <div className="text-muted small">Loading...</div>
        ) : userInfo ? (
          <>
            <div
              className="rounded-circle d-inline-flex justify-content-center align-items-center mb-1"
              style={{
                width: '40px',
                height: '40px',
                fontSize: '1rem',
                background: 'linear-gradient(to right, #00ffb7, #00c9ff)',
                color: '#000',
                fontWeight: 'bold',
              }}
            >
              {userInfo.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <p className="fw-bold mb-0 small">{userInfo.name}</p>
            <p className="text-light small mb-0">{userInfo.email}</p>
          </>
        ) : (
          <div className="text-danger small">Error loading user</div>
        )}
      </div>

      {/* Only show these if token exists */}
      {token && (
        <>
          {/* Options */}
          <div className="px-3 pt-2 pb-1">
            {[
              { icon: <User size={15} />, label: 'Profile' },
              { icon: <Settings size={15} />, label: 'Settings' },
              { icon: <CreditCard size={15} />, label: 'Pricing' },
              { icon: <FileText size={15} />, label: 'Docs' },
              { icon: <Users size={15} />, label: 'Community' }
            ].map((item, i) => (
              <button
                key={i}
                className="btn btn-outline-light w-100 d-flex align-items-center gap-2 px-3 py-1 my-1 rounded-2 text-white"
                style={{ fontSize: '0.85rem', backgroundColor: '#1b2a34' }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Credits */}
          <div className="px-3 pt-2 pb-1 border-top border-secondary">
            <p className="text-info small mb-1">Credits</p>
            <div className="d-flex justify-content-between small mb-2 text-white">
              <span>Monthly</span>
              <strong>5.00</strong>
            </div>
            <button
              className="btn btn-sm w-100 text-dark fw-bold"
              style={{
                background: 'linear-gradient(90deg, #00ffb7, #00c9ff)',
                border: 'none',
              }}
            >
              Upgrade
            </button>
          </div>

          {/* Preferences */}
          <div className="px-3 pt-2 pb-2 border-top border-secondary">
            <p className="text-info small mb-1">Preferences</p>
            <div className="d-flex justify-content-between align-items-center small mb-2 text-white">
              <span>Theme</span>
              <div
                className="rounded-circle"
                style={{
                  width: '22px',
                  height: '22px',
                  background: 'linear-gradient(90deg, #00ffb7, #00c9ff)',
                  border: '1px solid #fff',
                }}
              ></div>
            </div>
            <div className="d-flex justify-content-between align-items-center small text-white">
              <span>Language</span>
              <span className="text-muted">EN</span>
            </div>
          </div>

          {/* Logout */}
          <div className="px-3 pt-2 pb-3 border-top border-secondary">
            <button
              onClick={handleLogout}
              className="btn btn-link text-danger d-flex align-items-center gap-2 px-0 py-1 small"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
