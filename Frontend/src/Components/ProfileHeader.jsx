// src/Components/ProfileHeader.jsx
import React, { useState } from 'react';
import ProfileDropdown from './ProfileDropdown';
import { User } from 'lucide-react';

const ProfileHeader = () => {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem('cookie');

  const toggleDropdown = () => setOpen((prev) => !prev);

  return (
    <div className="position-relative">
      <button
        className="btn btn-outline-info d-flex align-items-center gap-2"
        onClick={toggleDropdown}
        style={{ borderRadius: '20px' }}
      >
        <User size={18} />
        <span>Profile</span>
      </button>
      <ProfileDropdown isOpen={open} onClose={() => setOpen(false)} token={token} />
    </div>
  );
};

export default ProfileHeader;
