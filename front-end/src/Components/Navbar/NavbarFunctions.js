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
              <li className="nav-item ">
                <a className="nav-link violet-text" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link violet-text" href="#">
                  Pay
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link violet-text" href="#">
                  Statement
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link violet-text" href="#">
                  Savings Account
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link violet-text" href="#">
                  Check Balance
                </a>
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
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
