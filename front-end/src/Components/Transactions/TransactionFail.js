import React from "react";
import NavBarUser from "../Navbar/NavBarUser";
import { Link } from "react-router-dom";
import "./withdraw.css";

export default function TransactionFail() {
  return (
    <div>
      <NavBarUser />
      <div className="container mt-4">
        <div className="row justify-content-center violet-text">
          <h1>
            Transaction Failed <i className="fas fa-times"></i>
          </h1>

          <div className="circle-image">
            {/* You can replace this with your circle image */}
            <br></br>
            <img
              src="unsuccessful.png" // Replace with your circle image URL
              alt="Circle"
              width="180"
              height="150"
            />
          </div>
          <div>
            <br />
            <h3>
              Something Went Wrong With Your Transaction, Please Try Again
              Later.&#128577;
            </h3>
            <br></br>
            <Link className="btn violet-button" to="/dashboard">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
