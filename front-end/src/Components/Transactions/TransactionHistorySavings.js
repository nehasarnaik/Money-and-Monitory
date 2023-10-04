import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../../UserContext";
import NavBarUser from "../Navbar/NavBarUser";
import NavbarSavings from "../Navbar/NavbarSavings";
import Table from "react-bootstrap/esm/Table";

export default function TransactionHistorySavings() {
  const { user } = useUser();
  const [data, setTransactionData] = useState("");
  useEffect(() => {
    fetch(
      "http://localhost:9091/account/savings/transactionhistory/" + user.userId
    )
      .then((response) => response.json())
      .then((data) => {
        setTransactionData(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <NavBarUser />
      <NavbarSavings />
      <br></br>
      <h1 className="color">TRANSACTION HISTORY - SAVINGS ACCOUNT</h1>

      <br></br>
      <div className="tablepadding">
        <Table striped bordered hover>
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
            {/* {data.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.narration}</td>
              <td>{item.referenceNumber}</td>
              <td>{item.debited}</td>
              <td>{item.credited}</td>
              <td>{item.closingBalance}</td>
              
            </tr>
          ))} */}

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
            {/* <h1>{JSON.stringify(data)}</h1> */}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
