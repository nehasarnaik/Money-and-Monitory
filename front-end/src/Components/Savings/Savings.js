import React, { useEffect, useState } from "react";
import NavbarSavings from "../Navbar/NavbarSavings";
import NavBarUser from "../Navbar/NavBarUser";
import { useUser } from "../../UserContext";
import RoundUp from "../RoundUp/RoundUp"; // Import the RoundUp component
import HeaderBar from "../Header/header";
import { useNavigate } from "react-router-dom";

import savingsaccount from "../../Assets/savings.png";
import { useNavigate } from "react-router-dom";


export default function Savings() {
  const { user } = useUser();
  const [accountInfo, setAccountInfo] = useState({});
  const MSUsername = 'MSUser';
  const MSPassword = 'moneyAndMonitory';
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch account number info from the server when the component mounts
    if (Object.keys(user).length === 0) {
      navigate("/login"); // Replace with your login route
    }
    const fetchAccountInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/account-service/account/savingsaccount/${user.userId}`,{method:'GET', 
          headers: {'Authorization': 'Basic ' + btoa(MSUsername+':'+MSPassword)}}
        );
        if (response.ok) {
          const data = await response.json();
          setAccountInfo(data);
          console.log(data);
        } 
        else {
          // Handle errors, e.g., show an error message
          console.error("Failed to fetch account info");
        }
      } catch (error) {

        navigate("/dashboard");
        // alert("Please enable round up feature first");

      }
    };

    fetchAccountInfo();
  }, [user.userId]); // Include user.userId in the dependency array

  return (
    <div>
      <HeaderBar/>
      <NavbarSavings />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="alert alert-light-violet" role="alert">
              <h2 className="alert-heading">Savings Account</h2>
              <hr />
              <p className="mb-0">
                <strong>
                  Account Number: {accountInfo.savingsAccountNumber || ""}
                </strong>
              </p>
              <p className="mb-0">
                <strong>Balance: $ {accountInfo.balance || ""}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
