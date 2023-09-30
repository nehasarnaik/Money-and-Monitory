import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import NavBarUser from "../Navbar/NavBarUser";
import { useNavigate } from "react-router-dom";
import './savings.css'

export default function LockAccount() {

    const[amount,setAmount]=useState('');
    const[pin,setPin]=useState('');
    const navigate=useNavigate();
  return (
    <div>
      <NavBarUser />
      <NavbarFunctions />
      
        <br></br>
        <h1 className="h1">WANT TO SAVE MORE MONEY?</h1>
        <br></br>
        <h4 className="h4">LOCK YOUR SAVINGS ACCOUNT</h4>
        
        <form className="dropdown">
        <select
            className="form-select dropwidth"
            id="accountSelect"
                    //   value={selectedAccount}
                    //   onChange={handleAccountChange}
        >
            <option value="account1">6 Months</option>
            <option value="account2">1 Year</option>
            <option value="account2">2 Years</option>
            <option value="account2">5 Years</option>
            <option value="account2">10 Years</option>
        </select>
        <br></br>
        <label>
        <input className="checkbox" type="checkbox"/> You won't be able to withdraw money for above selected period of time</label><br></br>
        <br></br>
        <button className="btn btn-light button buttonpadding" type="submit">Lock the Account</button>
        </form>
    </div>
  );
}
