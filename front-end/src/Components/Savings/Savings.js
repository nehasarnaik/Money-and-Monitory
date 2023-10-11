import React, { useEffect, useState } from "react";
import NavbarSavings from "../Navbar/NavbarSavings";
import NavBarUser from "../Navbar/NavBarUser";
import { useUser } from "../../UserContext";
import RoundUp from "../RoundUp/RoundUp"; // Import the RoundUp component
import HeaderBar from "../Header/header";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
import savingsaccount from "../../Assets/savings.png";
>>>>>>> 819fb8b08912c7ecd43bb63e1d4c5a8b44652b30

export default function Savings() {
  const { user } = useUser();

  const [accountInfo, setAccountInfo] = useState({});
<<<<<<< HEAD
  const MSUsername = 'MSUser';
  const MSPassword = 'moneyAndMonitory';
  const navigate = useNavigate();
=======
  const MSUsername = "MSUser";
  const MSPassword = "moneyAndMonitory";
>>>>>>> 819fb8b08912c7ecd43bb63e1d4c5a8b44652b30

  useEffect(() => {
    // Fetch account number info from the server when the component mounts
    const fetchAccountInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/account-service/account/savingsaccount/${user.userId}`,
          {
            method: "GET",
            headers: {
              Authorization: "Basic " + btoa(MSUsername + ":" + MSPassword),
            },
          }
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
        // alert("Enable round up feature");

      }
    };

    fetchAccountInfo();
  }, [user.userId]); // Include user.userId in the dependency array

  return (
    <div>
      <HeaderBar />
      <div className="mt-4">
        <div className="row">
          {/* First Column: Navbar */}
          <div className="col-md-3 justify-content-start">
            <NavbarSavings />
          </div>

          {/* Third Column: Savings Account Display */}
          <div
            className="col-md-4 justify-content-center"
            style={{ marginTop: "30px" }}
          >
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

          {/* Second Column: Image */}
          <div className="col-md-5">
            <div className="vertical-center">
              {/* Add your image here */}
              <img src={savingsaccount} alt="savings" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
