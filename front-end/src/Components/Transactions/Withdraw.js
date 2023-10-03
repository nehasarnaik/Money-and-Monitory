import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import NavBarUser from "../Navbar/NavBarUser";
import "./withdraw.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Withdraw() {
  const [selectedAccount, setSelectedAccount] = useState(""); // State to store selected account
  const [withdrawAmount, setWithdrawAmount] = useState(""); // State to store withdrawal amount

  let navigate = useNavigate();
  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const handleAmountChange = (event) => {
    setWithdrawAmount(event.target.value);
  };

  const handleSubmit = async () => {
    //Assuming withdraw only for savings account
    //getting debit card number from the database to check
    const userId = 2;
    await axios
      .get(`http://localhost:9091/account/savingsaccount/${userId}`)
      .then((res) => {
        console.log("from spring boot", res.data.savingsAccountNumber);
        console.log("from react", selectedAccount);

        if (selectedAccount !== String(res.data.savingsAccountNumber)) {
          alert("enter a valid account number");
        } else {
          axios
            .put(
              `http://localhost:9091/account/savingsaccount/withdraw/${userId}/${withdrawAmount}`
            )
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                alert("Withdraw Successful");
                console.log(res.data.referenceNumber);
                let transactionId = res.data.referenceNumber.toString();
                console.log(transactionId);
                navigate(`/transactionsuccess/${transactionId}`);
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
                      Account Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="account"
                      value={selectedAccount}
                      onChange={handleAccountChange}
                      placeholder="Enter Account number"
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
