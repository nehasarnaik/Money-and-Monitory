import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Components/Home/Home";
import Dash_board from "./Components/Dash_board/Dash_board";
import Register from "./Components/Register/Register";

import Withdraw from "./Components/Transactions/Withdraw";
import TransactionSucess from "./Components/Transactions/TransactionSucess";
import TransactionFail from "./Components/Transactions/TransactionFail";
import Deposit from "./Components/Transactions/Deposit";

import PaymentGateway from "./Components/Transactions/PaymentGateway";
import LockAccount from "./Components/Savings/LockAccount";
import TransactionHistory from "./Components/Transactions/TransactionHistory";

import Login from "./Components/Login/Login";
import CheckBalance from "./Components/Transactions/CheckBalance";
import ViewProfile from "./Components/ViewProfile/ViewProfile";
import RoundUp from "./Components/RoundUp/RoundUp";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <div className="header background_colour">
          <h1 className="text_padding">Product Name</h1>
        </div>

        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/" element={<Dash_board></Dash_board>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/withdraw" element={<Withdraw />}></Route>
          <Route path="/deposit" element={<Deposit />}></Route>
          <Route
            path="/transactionsuccess/:transactionId"
            element={<TransactionSucess />}
          ></Route>

          <Route path="/transactionfail" element={<TransactionFail />}></Route>
          <Route path="/paymentgateway" element={<PaymentGateway />}></Route>
          <Route path="/lockaccount" element={<LockAccount />}></Route>
          <Route
            path="/transactionhistory"
            element={<TransactionHistory />}
          ></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/checkbalance" element={<CheckBalance />}></Route>
          <Route path="/viewprofile/:userId" element={<ViewProfile />}></Route>
          <Route path="/roundup" element={<RoundUp />}></Route>
        </Routes>
      </BrowserRouter><div id="footer"></div>
    </div>
  );
}

export default App;
