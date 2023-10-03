import React from "react";
import NavBarUser from "../Navbar/NavBarUser";
import TransactionHistory from "../Transactions/TransactionHistory";
import Withdraw from "../Transactions/Withdraw";
import Deposit from "../Transactions/Deposit";
import TransactionSuccess from "../Transactions/TransactionSucess";
import TransactionFail from "../Transactions/TransactionFail";
import "./Dash_board.css";
import Sidebar from "../Dash_board/sidebar";
import RightSidebar from "../Dash_board/RightSidebar";
const Dash_board = () => {
  return (
    <div className="dashboard-container">
      <NavBarUser />
      <Sidebar/>
      <RightSidebar/>
      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>User Details</h2>
          {/* Add user details component */}
        </div>

        <div className="dashboard-section">
          <h2>Transaction History</h2>
          <TransactionHistory />
        </div>

        <div className="dashboard-section">
          <h2>Withdraw Funds</h2>
          <Withdraw />
        </div>

        <div className="dashboard-section">
          <h2>Deposit Funds</h2>
          <Deposit />
        </div>

        <div className="dashboard-section">
          <h2>Transaction Success</h2>
          <TransactionSuccess />
        </div>

        <div className="dashboard-section">
          <h2>Transaction Fail</h2>
          <TransactionFail />
        </div>
      </div>
    </div>
   
  );
};

export default Dash_board;
