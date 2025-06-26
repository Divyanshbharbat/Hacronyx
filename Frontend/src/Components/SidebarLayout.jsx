import React, { useState } from 'react';
import SidebarNavbar from './Navbar';
import ProfileHeader from './ProfileHeader'; // 🔥 Your dropdown button

const SidebarLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <SidebarNavbar />
      <div className="flex-grow-1 p-3" style={{ minHeight: '100vh', backgroundColor: '#0d0d0d' }}>
        {/* 🔽 Add Profile Dropdown here globally for all sidebar pages */}
        <div className="d-flex justify-content-end">
          <ProfileHeader />
        </div>
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
