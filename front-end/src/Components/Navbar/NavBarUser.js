import React from "react";
import "./navbar.css";

export default function NavBarUser() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-violet">
      <div className="container-fluid">
        <div className="d-flex justify-content-between w-100">
          <a className="navbar-brand" href="#" style={{ color: "#490778" }}>
            <img
              src="user-profile.png" // Replace with your profile image URL
              alt="Profile"
              width="30"
              height="30"
              className="d-inline-block align-top rounded-circle me-2"
            />
            Username
          </a>
          <button
            className="btn"
            style={{
              borderColor: "white",
              backgroundColor: "#490778",
              color: "white",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
