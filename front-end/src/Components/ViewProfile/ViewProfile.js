import React from 'react';
import './ViewProfile.css';
import { useUser } from '../../UserContext';


const ViewProfile = () => {
 
  const { user } = useUser(); 
  return (
    // Click on the image logo or username to ViewProfile
    <div className="container view-profile mt-5">
      
        <div className="card mb-5">
          <div className="card-body view-profile">
            <h5 className="card-title view-profile mb-4 violet-text bold-text">YOUR PROFILE</h5>
            <div className="profile-info">
              <div className="mb-3">
            
                <strong>Name:</strong> {user.name}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="mb-3">
                <strong>Phone:</strong> {user.mobile}
              </div>
              <div className="mb-3">
                <strong>Date of Birth:</strong> {user.dob}
              </div>
              <div className="mb-3">
                <strong>Address:</strong> {user.address}
              </div>
              {/* Add more user data fields if needed */}
            </div>
          </div>
        </div>
    </div>
  );
}

export default ViewProfile;
