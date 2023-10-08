import React, { useState,useEffect } from "react";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import NavBarUser from "../Navbar/NavBarUser";
import "./RoundUp.css";
import NavbarSavings from "../Navbar/NavbarSavings";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import SidebarFunctions from "../Navbar/SidebarFunctions";

const RoundUp = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isRoundUpEnabled, setIsRoundUpEnabled] = useState(user.roundUpSavings);

  // Function to toggle the Round Up service
  const toggleRoundUp = () => {
    setIsRoundUpEnabled(!isRoundUpEnabled);
    //axios.put("http://localhost:8080/account-service/account/roundup/"+user.userId);
    axios.put("http://localhost:8080/user-management-service/user/roundup/"+user.userId);
    user.roundUpSavings = !user.roundUpSavings;
    //navigate("/savingsaccount");
  };

  return (
    <div>
      <NavBarUser></NavBarUser>
      <SidebarFunctions/>
      <div className="roundup-container mt-3">
        <h2 className="violet-text  bold-text">Round Up Service</h2>
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
  );
};

export default RoundUp;
