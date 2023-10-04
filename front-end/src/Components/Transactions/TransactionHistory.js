import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import NavBarUser from "../Navbar/NavBarUser";
import "../script.css"
import Table from 'react-bootstrap/Table';
import { useUser } from "../../UserContext";
import axios from "axios";

export default function TransactionHistory() {
  const { user } = useUser();
  const [data, setTransactionData] = useState("");

  useEffect(() => {
    fetch('http://localhost:9091/account/debit/transactionhistory/'+user.userId)
      .then((response) => response.json())
      .then((data) =>{ 
        setTransactionData(data)
        console.log(data);
      });
     
  }, []);

  return (
    <div>
      <NavBarUser />
      <NavbarFunctions />
      <br></br>
      <h1 className="color">TRANSACTION HISTORY</h1><br></br>
      <div className="tablepadding">
      <Table striped bordered hover >
        <thead>
          <tr>
              <th>Date and Time</th>
              <th>Narration</th>
              <th>Reference Number</th>
              <th>Debited Amount</th>
              <th>Credited Amount</th>
              <th>Closing Balance</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) ? (
              data.map((item) => (
                <tr key={item.id}>
                   <td>{item.date}</td>
              <td>{item.narration}</td>
              <td>{item.referenceNumber}</td>
              <td>{item.debited}</td>
              <td>{item.credited}</td>
              <td>{item.closingBalance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">Loading...</td>
              </tr>
            )}
        </tbody>
       
    </Table>
    </div>
    </div>
  );
}
