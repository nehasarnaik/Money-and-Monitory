import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Dash_board from "./Components/Dash_board/Dash_board";
import Register from "./Components/Register/Register";
import Withdraw from "./Components/Transactions/Withdraw";
import "bootstrap/dist/css/bootstrap.min.css";
import TransactionSucess from "./Components/Transactions/TransactionSucess";
import TransactionFail from "./Components/Transactions/TransactionFail";
import Deposit from "./Components/Transactions/Deposit";
import PaymentGateway from "./Components/Transactions/PaymentGateway";
import LockAccount from "./Components/Savings/LockAccount";
import TransactionHistory from "./Components/Transactions/TransactionHistory";

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
            path="/transactionsuccess"
            element={<TransactionSucess />}
          ></Route>
          <Route path="/transactionfail" element={<TransactionFail />}></Route>
          <Route path="/paymentgateway" element={<PaymentGateway />}></Route>
          <Route path="/lockaccount" element={<LockAccount />}></Route>
          <Route path="/transactionhistory" element={<TransactionHistory />}></Route>
        </Routes>
      </BrowserRouter><div id="footer"></div>
    </div>
  );
}

export default App;
