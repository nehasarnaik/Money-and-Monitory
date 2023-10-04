import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function NavbarSavings() {
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
                <Link to={"/withdraw"} class="nav-link violet-text">
                  Withdraw
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/lockaccount"} class="nav-link violet-text">
                  Lock Savings Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
