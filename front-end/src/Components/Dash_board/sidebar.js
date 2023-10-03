import React from 'react';
import './sidebar.css'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="user-profile">
        <img
          src="user-profile.png" 
          alt="Profile"
          className="profile-image"
        />
        <div className="user-info">
          <h3>User Name</h3>
          <p>User Email</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
