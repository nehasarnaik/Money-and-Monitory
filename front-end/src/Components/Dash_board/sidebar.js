import React from 'react';
import './sidebar.css'; 

const Sidebar = (myData) => {
  const user = myData.data;
  
  return (
    <div className="sidebar">
      <div className="user-profile">
        <div className="user-info">
        <table >
        <tr>
            <td className='h1 sidebar'>
              <h3>DEBIT ACCOUNT</h3>
              <img
              src="user-profile.png" 
              alt="Profile"
              className="profile-image"
            />
            <h1>{user.name}</h1>
            </td>
            <td className='h5'>
              <h3>USER DETAILS</h3>
              <h5>User Id:{user.userId}</h5>
              <h5>Email Id:{user.email}</h5>
              <h5>Phone:{user.mobile}</h5>
              <h5>Date of Birth:{user.dob}</h5>
              <h5>Address:{user.address}</h5>
            </td>
            
        </tr>
    </table>
    </div>
      </div>
    </div>
  );
};

export default Sidebar;
