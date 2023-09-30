import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import NavBarUser from "../Navbar/NavBarUser";
import "../script.css"
import Table from 'react-bootstrap/Table';

export default function TransactionHistory() {
  return (
    <div>
      <NavBarUser />
      <NavbarFunctions />
      <br></br>
      <h1 className="color">TRANSACTION HISTORY</h1><br></br>
      <div className="tablepadding">
      <Table striped bordered hover >
        <tr>
            <th>Date</th>
            <th>Narration</th>
            <th>Reference Number</th>
            <th>Debited Amount</th>
        </tr>
            <td>30/09/2023</td>
            <td>Transferred to SBI</td>
            <td>123</td>
            <td>300</td>
        <tr>
        </tr>
    </Table>
    </div>
    </div>
  );
}
