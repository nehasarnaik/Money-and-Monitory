import React, { useEffect } from "react";
import "./sidebar.css";
import { useUser } from "../../UserContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user } = useUser();

  return (
    <div className="container">
      <div className="sidebar">
        <div className="user-profile">
          <div className="user-info">
            <table>
              <tr>
                <td className="h1 sidebar">
                  <h3 className="display-3">DEBIT ACCOUNT</h3>
                  <img
                    src="userprofile1.png"
                    alt="Profile"
                    className="profile-image"
                  />
                  <h1 className="display-6">{user.name}</h1>
                  <hr />
                </td>
              </tr>
              <tr>
                <td className="sidebar">
                  <h3 className="display-6">USER DETAILS</h3>
                  <table class="table table-borderless">
                    <tbody>
                      <tr>
                        <th scope="row">User ID</th>
                        <td>{user.userId}</td>
                      </tr>
                      <tr>
                        <th scope="row">Email Id</th>
                        <td>{user.email}</td>
                      </tr>
                      <tr>
                        <th scope="row">Phone</th>
                        <td>{user.mobile}</td>
                      </tr>
                      <tr>
                        <th scope="row">Date of Birth</th>
                        <td>{user.dob}</td>
                      </tr>
                      <tr>
                        <th scope="row">Address</th>
                        <td>{user.address}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <div className="d-flex justify-content-center">
                <tr>
                  <td>
                    <Link to="/editprofile" className="btn btn-primary button">
                      Edit Profile
                    </Link>
                  </td>
                  <br></br>
                </tr>
              </div>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
