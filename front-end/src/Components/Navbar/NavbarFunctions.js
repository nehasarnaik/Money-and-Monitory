import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function NavbarFunctions() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <ul className="navbar-nav">
            <li className="nav-item">
                <Link to={"/dashboard"} class="nav-link violet-text">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/transfermoney"} class="nav-link violet-text">
                  Pay
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/transactionhistory"} class="nav-link violet-text">
                  Statement
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link violet-text" href="#">
                  Savings Account
                </a>
              </li>
              <li className="nav-item">
                <Link to={"/checkbalance"} class="nav-link violet-text">
                  Check Balance
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/withdraw"} class="nav-link violet-text">
                  Withdraw
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/deposit"} class="nav-link violet-text">
                  Deposit
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/roundup"} class="nav-link violet-text">
                  Round Ups
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
