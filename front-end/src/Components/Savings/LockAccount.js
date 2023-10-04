import React, { useState,useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import NavBarUser from "../Navbar/NavBarUser";
import { useNavigate } from "react-router-dom";
import './savings.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useUser } from "../../UserContext";
import axios from "axios";

export default function LockAccount() {

  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState(null);
  const [formatedDate, setFormatedDate] = useState(null);
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date)
  };

  const onSubmit = () => {
    const inputDate = new Date(selectedDate);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = inputDate.toLocaleDateString("en-IN", options);

    axios.put("http://localhost:9091/account/lockaccount/"+user.userId+"/"+selectedDate);
    alert("Savings account locked till " + formattedDate)
    navigate("/dashboard");
  };

  return (
    <div className="width">
      <NavBarUser />
      <NavbarSavings />
      <NavbarFunctions />
      
        <br></br>
        <h1 className="h1">WANT TO SAVE MORE MONEY?</h1>
        <br></br>
        <h4 className="h4">LOCK YOUR SAVINGS ACCOUNT</h4>
        
        <form className="dropdown" onSubmit={onSubmit}>
        <div className="calender">
          <DatePicker 
            placeholderText="Select date"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd" // Specify the date format you prefer
          />
        </div>
        <br></br>
        <label>
        <input className="checkbox" type="checkbox" required/> You won't be able to withdraw money for above selected period of time</label><br></br>
        <br></br>
        <button className="btn btn-light button buttonpadding" type="submit">Lock the Account</button>
        <br></br>
        <br></br>
        </form>
    </div>
  );
}
