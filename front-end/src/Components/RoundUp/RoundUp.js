import React, { useState } from "react";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import NavBarUser from "../Navbar/NavBarUser";
import "./RoundUp.css";
import NavbarSavings from "../Navbar/NavbarSavings";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";

const RoundUp = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isRoundUpEnabled, setIsRoundUpEnabled] = useState(user.roundUp);

  // Function to toggle the Round Up service
  const toggleRoundUp = () => {
    setIsRoundUpEnabled(!isRoundUpEnabled);
    //axios.put("http://localhost:9091/account/roundup/"+user.userId);
    axios.put("http://localhost:9090/user/roundup/"+user.userId);
    navigate("/savingsaccount");
  };

  return (
    <div>
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
