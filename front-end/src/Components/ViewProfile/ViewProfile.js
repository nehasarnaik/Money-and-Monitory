import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './ViewProfile.css';

const ViewProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, [userId]);

  return (
    // Click on the image logo or username to ViewProfile
    <div className="container view-profile mt-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
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
              {/* Add more user data fields as needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewProfile;
