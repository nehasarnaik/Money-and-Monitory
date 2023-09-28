import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./Components/Home/Home"
function App() {
  return (
    <div className="App">
        <div className='header background_colour'>
          <h1 className='text_padding'>Product Name</h1>
        </div>
        <Home></Home>
    </div>
  );
}

export default App;
