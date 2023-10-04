import React, { useState } from "react";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import NavBarUser from "../Navbar/NavBarUser";
import "./RoundUp.css";
import NavbarSavings from "../Navbar/NavbarSavings";

const RoundUp = () => {
  // Initialize the state to true (enabled)
  const [isRoundUpEnabled, setIsRoundUpEnabled] = useState(true);

  // Function to toggle the Round Up service
  const toggleRoundUp = () => {
    setIsRoundUpEnabled(!isRoundUpEnabled);
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
