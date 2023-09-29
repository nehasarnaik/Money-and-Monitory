import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Withdraw from "./Components/Transactions/Withdraw";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="header background_colour">
          <h1 className="text_padding">Product Name</h1>
        </div>

        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/withdraw" element={<Withdraw />}></Route>
        </Routes>
      </BrowserRouter>

      <div id="footer"></div>
    </div>
  );
}

export default App;
