import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../script.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from '../Register/Register';
import { Link } from "react-router-dom";
import Login from '../Login/Login';
import RegisterNav from '../Navbar/RegisterNav';

const Home = () => {
    return ( 
        <div>
           
            <Login></Login>
        </div>
     );
}
 
export default Home;