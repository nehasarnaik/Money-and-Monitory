import React, { useState, useEffect } from "react";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import NavBarUser from "../Navbar/NavBarUser";
import "./RoundUp.css";
import NavbarSavings from "../Navbar/NavbarSavings";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import SidebarFunctions from "../Navbar/SidebarFunctions";
import "./RoundUp.css";
import HeaderBar from "../Header/header";

const RoundUp = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/login"); // Replace with your login route
    }
  }, []);

  const [isRoundUpEnabled, setIsRoundUpEnabled] = useState(user.roundUpSavings);
  const MSUsername = "MSUser";
  const MSPassword = "moneyAndMonitory";
  // Function to toggle the Round Up service
  const toggleRoundUp = () => {
    setIsRoundUpEnabled(!isRoundUpEnabled);
    //axios.put("http://localhost:8080/account-service/account/roundup/"+user.userId);
    axios.put(
      "http://localhost:8080/user-management-service/user/roundup/" +
        user.userId,
      {},
      {
        auth: {
          username: MSUsername,
          password: MSPassword,
        },
      }
    );
    user.roundUpSavings = !user.roundUpSavings;
    //navigate("/savingsaccount");
  };

  return (
    <div>
      <HeaderBar />
      <div className="roundup-container">
        <div className="row">
          <div className="col-md-3">
            <SidebarFunctions />
          </div>
          <div className="col-md-5">
            {/* Two Rows of Two Cards Each */}
            <div className="row">
              <div className="col-md-6">
                <div className="card bg-violet text-white">
                  <div className="card-body">
                    <h5 className="card-title">Financial Discipline</h5>
                    <p className="card-text">
                      Build your savings habits without even having to think
                      about it. Each rounded-up transaction contributes to your
                      savings, helping you achieve your financial goals over
                      time.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-violet text-white">
                  <div className="card-body">
                    <h5 className="card-title">Micro-Savings</h5>
                    <p className="card-text">
                      With this feature, every purchase you make gets rounded up
                      to the nearest dollar, and the extra cents are
                      automatically transferred straight into your savings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-6">
                <div className="card bg-violet text-white">
                  <div className="card-body ">
                    <h5 className="card-title">Flexible Control</h5>
                    <p className="card-text">
                      You have the power to easily enable or disable Round Up as
                      needed and also lock savings account according to you
                      needs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-violet text-white">
                  <div className="card-body">
                    <h5 className="card-title">Automated Savings</h5>
                    <p className="card-text">
                      Turn on the Round Up feature to effortlessly save spare
                      change from your everyday debit card transactions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            {/* Right Side Content */}
            <div className="roundup-container mt-3">
              <h2 className="violet-text bold-text">Round Up Service</h2>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isRoundUpEnabled}
                  onChange={toggleRoundUp}
                />
                <span className="slider round"></span>
              </label>
              <p>
                {isRoundUpEnabled
                  ? "Round Up service is enabled"
                  : "Round Up service is disabled"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundUp;
