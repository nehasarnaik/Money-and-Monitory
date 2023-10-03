import React from "react";
import NavBarUser from "../Navbar/NavBarUser";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import { useState } from "react";
import "./withdraw.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Deposit() {
  const [selectedAccount, setSelectedAccount] = useState(""); // State to store selected account
  const [depositAmount, setDepositAmount] = useState(""); // State to store Deposit amount

  let navigate = useNavigate();

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const handleAmountChange = (event) => {
    setDepositAmount(event.target.value);
  };

  const handleSubmit = async () => {
    //Deposit only for Debit card for now

    //getting debit card number from the database to check
    const userId = 1;
    await axios
      .get(`http://localhost:9091/account/debitaccount/${userId}`)
      .then((res) => {
        if (selectedAccount !== String(res.data.debitAccountNumber)) {
          alert("enter a valid account number");
        } else {
          axios
            .put(
              `http://localhost:9091/account/debitaccount/deposit/${userId}/${depositAmount}`
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
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("Selected Account:", selectedAccount);
    console.log("Withdraw Amount:", depositAmount);
  };

  const handleCancel = () => {
    // Handle cancel logic here (e.g., resetting form fields)
    setSelectedAccount("");
    setDepositAmount("");
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
                      onChange={handleAccountChange}
                      placeholder="Enter Account Number to Deposit"
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
