import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import NavBarUser from "../Navbar/NavBarUser";
import "./withdraw.css";

export default function Withdraw() {
  const [selectedAccount, setSelectedAccount] = useState(""); // State to store selected account
  const [withdrawAmount, setWithdrawAmount] = useState(""); // State to store withdrawal amount

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const handleAmountChange = (event) => {
    setWithdrawAmount(event.target.value);
  };

  const handleSubmit = () => {
    // Handle submission logic here (e.g., making a withdrawal)
    // You can access the selectedAccount and withdrawAmount state values here
    console.log("Selected Account:", selectedAccount);
    console.log("Withdraw Amount:", withdrawAmount);
  };

  const handleCancel = () => {
    // Handle cancel logic here (e.g., resetting form fields)
    setSelectedAccount("");
    setWithdrawAmount("");
  };

  return (
    <div>
      <NavBarUser />
      <NavbarFunctions />
      <div className="container mt-4">
        <div className="row justify-content-center">
          {/* Center align content */}
          <div className="col-md-4">
            <div className="card cardbg-color">
              {" "}
              {/* Apply violet border */}
              <div className="card-body">
                <h2 className="card-title white-text">Withdraw</h2>
                <br />
                {/* Center align the heading */}
                <form className="text-start white-text">
                  <div className="mb-3">
                    <label htmlFor="accountSelect" className="form-label">
                      Select Account
                    </label>
                    <select
                      className="form-select"
                      id="accountSelect"
                      value={selectedAccount}
                      onChange={handleAccountChange}
                    >
                      <option value="account1">Savings Account</option>
                      <option value="account2">Debit Card Account</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="amount" className="form-label">
                      Amount
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="amount"
                      value={withdrawAmount}
                      onChange={handleAmountChange}
                      placeholder="Enter Amount to withdraw"
                    />
                  </div>
                  <br />
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn whitebutton"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary ms-2"
                      onClick={handleCancel}
                      style={{ fontWeight: "bold" }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
