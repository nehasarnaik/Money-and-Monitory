import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import NavBarUser from "../Navbar/NavBarUser";
import "./withdraw.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import SidebarFunctions from "../Navbar/SidebarFunctions";

export default function Deposit() {
  const { user } = useUser();
  const [selectedAccount, setSelectedAccount] = useState(""); // State to store selected account
  const [depositAmount, setDepositAmount] = useState(""); // State to store Deposit amount

  let navigate = useNavigate();

  const handleAmountChange = (event) => {
    setDepositAmount(event.target.value);
  };

  useEffect(() => {
    // Fetch the debit account number when the component mounts
    const userId = user.userId;
    axios
      .get(`http://localhost:8080/account-service/account/debitaccount/${userId}`)
      .then((res) => {
        setSelectedAccount(String(res.data.debitAccountNumber));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.userId]); // Dependency array ensures this effect runs when userId changes

  const handleSubmit = async () => {
    // Deposit only for Debit card for now
    // Getting debit card number from the database to check
    const userId = user.userId;
    await axios
      .put(
        `http://localhost:8080/account-service/account/debitaccount/deposit/${userId}/${depositAmount}`
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("Deposit Successful");
          console.log(res.data.referenceNumber);
          let transactionId = res.data.referenceNumber.toString();
          console.log(transactionId);
          navigate(`/transactionsuccess/${transactionId}`);
        } else {
          navigate("/transactionfail");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Handle the 400 Bad Request error and show an alert
          alert("Insufficient funds!");
        } else {
          // Handle other errors here
          navigate("/transactionfail");
        }
      });
  };

  const handleCancel = () => {
    // Handle cancel logic here (e.g., resetting form fields)
    setDepositAmount("");
  };

  return (
    <div>
      <NavBarUser />
      <SidebarFunctions />
      <div className="container mt-4">
        <div className="row justify-content-center">
          {/* Center align content */}
          <div className="col-md-4">
            <div className="card cardbg-color">
              {" "}
              {/* Apply violet border */}
              <div className="card-body">
                <h2 className="card-title white-text">Deposit</h2>
                <br />
                {/* Center align the heading */}
                <form className="text-start white-text">
                  <div className="mb-3">
                    <label htmlFor="account" className="form-label">
                      Account Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="account"
                      value={selectedAccount}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="amount" className="form-label">
                      Amount
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="amount"
                      value={depositAmount}
                      onChange={handleAmountChange}
                      placeholder="Enter Amount to Deposit"
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
                    &nbsp;&nbsp;
                    <button
                      type="button"
                      className="btn btn-secondary"
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
