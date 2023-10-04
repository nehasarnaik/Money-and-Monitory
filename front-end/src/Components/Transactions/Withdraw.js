import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import NavBarUser from "../Navbar/NavBarUser";
import "./withdraw.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import NavbarSavings from "../Navbar/NavbarSavings";

export default function Withdraw() {
  const { user } = useUser();
  const [selectedAccount, setSelectedAccount] = useState(""); // State to store selected account
  const [withdrawAmount, setWithdrawAmount] = useState(""); // State to store withdrawal amount

  let navigate = useNavigate();

  useEffect(() => {
    // Fetch savings account number when the component mounts
    const userId = user.userId;
    axios
      .get(`http://localhost:9091/account/savingsaccount/${userId}`)
      .then((res) => {
        setSelectedAccount(String(res.data.savingsAccountNumber));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.userId]); // Dependency array ensures this effect runs when userId changes

  const handleAmountChange = (event) => {
    setWithdrawAmount(event.target.value);
  };

  const handleSubmit = async () => {
    //Assuming withdraw only for savings account
    const userId = user.userId;

    await axios
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
        } else if(error.response && error.response.status === 412){
          alert("Account is locked");
        }
        else{
          // Handle other errors here
          navigate("/transactionfail");
        }
      });
  };

  const handleCancel = () => {
    // Handle cancel logic here (e.g., resetting form fields)
    setWithdrawAmount("");
  };

  return (
    <div>
      <NavBarUser />
      <NavbarSavings />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card cardbg-color">
              <div className="card-body">
                <h2 className="card-title white-text">Withdraw</h2>
                <br />
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
