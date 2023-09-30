import React from "react";
import NavBarUser from "../Navbar/NavBarUser";
import { Link } from "react-router-dom";

export default function TransactionSucess() {
  const transactionDate = new Date().toLocaleDateString(); // Get the current date

  // Generate a random transaction ID (you can replace this with your logic)
  //temporary -- technically this should come from withdraw component
  const transactionId = Math.floor(Math.random() * 1000000);

  return (
    <div>
      <NavBarUser />
      <div className="container mt-4">
        <div className="row justify-content-center violet-text">
          <h1>
            {" "}
            Transaction Successful <i className="fas fa-check"></i>
          </h1>
          <h4 className="transaction-date">Date: {transactionDate}</h4>
          <div className="circle-image">
            {/* You can replace this with your circle image */}
            <br></br>
            <img
              src="sucess.png" // Replace with your circle image URL
              alt="Circle"
              width="150"
              height="150"
            />
          </div>
          <div>
            <br></br>
            <h3 className="transaction-id">Transaction ID: {transactionId}</h3>
            <br></br>
            <Link className="btn violet-button" to="/home">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
