import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home, Briefcase, Triangle, Menu, X,
  LogIn, LogOut, Search, Upload
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import toast from 'react-hot-toast';

const navigationItems = [
  { title: 'Home', url: '/home', icon: Home },
  { title: 'Projects', url: '/projects', icon: Briefcase },
  { title: 'Roadmaps', url: '/roadmaps', icon: Triangle },
];

const recentItems = [
  'Learning path dashboard',
  'Next.js landing page',
  'Next.js food platform',
  'Modern landing page',
  'Restaurant POS',
  'E-commerce Figma design',
];

export default function SidebarNavbar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('cookie') || !!localStorage.getItem('cookie2');

  const handleLogout = () => {
    localStorage.removeItem('cookie');
    localStorage.removeItem('cookie2');
    navigate('/');
  };

  const getNavClass = ({ isActive }) =>
    `d-flex align-items-center gap-2 px-3 py-2 rounded ${
      isActive ? 'bg-info text-dark fw-bold' : 'text-white nav-link-custom'
    }`;

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      toast.loading('📤 Uploading file...', { id: 'upload-toast' });
      const uploadRes = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('cookie')}`,
        },
        body: formData,
      });

      if (!uploadRes.ok) throw new Error('Upload failed');
      const uploadData = await uploadRes.json();

      toast.success('✅ File uploaded!', { id: 'upload-toast' });

      toast.loading('⚙️ Generating roadmap from file...', { id: 'roadmap-toast' });

      const roadmapRes = await fetch('http://localhost:3000/api/divyansh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('cookie')}`,
        },
        body: JSON.stringify({
          concept: uploadData.filename,
          background: 'file',
        }),
      });

      const roadmapData = await roadmapRes.json();

      if (!roadmapData.roadmap || roadmapData.roadmap.length === 0) {
        toast.error('⚠️ No roadmap generated.', { id: 'roadmap-toast' });
        return;
      }

      toast.success('🎯 Roadmap ready!', { id: 'roadmap-toast' });
      navigate('/projects');
    } catch (error) {
      toast.error('❌ Upload or roadmap generation failed', { id: 'upload-toast' });
      toast.dismiss('roadmap-toast');
      console.error(error);
    }
  };

  return (
    <div
      className={`d-flex flex-column ${isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}
      style={{
        width: isExpanded ? '260px' : '70px',
        height: '100vh',
        overflowY: 'auto',
        position: 'sticky',
        top: 0,
        background: '#000000',
        color: '#f1f1f1',
        transition: 'all 0.3s ease-in-out',
        boxShadow: '2px 0 10px rgba(0,0,0,0.5)',
        zIndex: 10,
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center border-bottom border-secondary p-3">
        {isExpanded && <h5 className="fw-bold mb-0 text-info">🧠 AI Tool</h5>}
        <button onClick={() => setIsExpanded(!isExpanded)} className="btn btn-outline-light btn-sm">
          {isExpanded ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Search */}
     

      {/* Nav Items */}
      <nav className="flex-grow-1 px-2 py-3">
        <ul className="list-unstyled">
          {navigationItems.map((item) => (
            <li key={item.title}>
              <NavLink to={item.url} className={getNavClass}>
                <item.icon size={18} />
                {isExpanded && <span>{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Recents */}
        {isExpanded && (
          <>
            <hr className="text-secondary" />
            <p className="text-info small fw-bold ps-3">Recents</p>
            <ul className="list-unstyled ps-3">
              {recentItems.map((title, idx) => (
                <li key={idx} className="text-white-50 mb-2" style={{ cursor: 'pointer' }}>
                  <small>• {title}</small>
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>

      {/* Upload File */}
      <div className="px-3 mb-2">
        <input
          type="file"
          id="fileUpload"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <button
          className="btn btn-outline-success w-100 d-flex align-items-center gap-2"
          onClick={() => document.getElementById('fileUpload').click()}
        >
          <Upload size={16} />
          {isExpanded && <span>Upload File</span>}
        </button>
      </div>

      {/* Auth Buttons */}
      <div className="border-top border-secondary p-3 mt-auto">
        {!isLoggedIn ? (
          <button onClick={() => navigate('/login')} className="btn btn-warning w-100 d-flex align-items-center gap-2">
            <LogIn size={18} />
            {isExpanded && <span>Login</span>}
          </button>
        ) : (
          <button onClick={handleLogout} className="btn btn-danger w-100 d-flex align-items-center gap-2">
            <LogOut size={18} />
            {isExpanded && <span>Logout</span>}
          </button>
        )}
      </div>
    </div>
  );
}
