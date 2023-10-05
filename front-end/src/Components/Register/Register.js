import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../script.css'
import './Register.css'
import { Link } from "react-router-dom";
import axios from "axios";
import RegisterNav from "../Navbar/RegisterNav";

const Register = () => {
   
    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        dob: "",
        pin: "",
        password: "",
        accountType:"Debit",
        roundUpSavings: false
      });

     const [confirmPassword, setConfirmPassword] = useState('');
   
     const userUrl = "http://localhost:9090/user";

    //accounts url
     const debitAccountUrl = "http://localhost:9090/user/debitaccount";
     const savingsAccountUrl = "http://localhost:9090/user/savingsaccount";

    let navigate = useNavigate();

    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const handleChange = (e) => {

        const { name, value } = e.target;
        if(name!=="roundUpSavings"){
            setUser({ ...user, [name]: value });
        }
        else{
            const { name, checked } = e.target;
            setUser({ ...user, [name]: checked });
        }
       console.log(user.roundUpSavings)
        if (e.target.name === "password") {
        // Validate the password using a regular expression
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        const isValid = passwordRegex.test(value);
        setIsPasswordValid(isValid);
        console.log(isValid);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!isPasswordValid) {
        // Display an error message for the invalid password
        alert("Invalid password");
        return;
    }

    const res = await axios.post(userUrl, user);
    console.log(res.data.id);
    console.log(user);
    alert("Registration Successful");
    //createAccount(res.data.id);
    navigate("/login");
  };

  //creating Account
  const createAccount = async (id) => {
    const debitAccountInfo = {
      accountNumber: generateUniqueAccountNumber(),
      accountType: user.accountType,
      userId: id,
      balance: 0, // Initial balance
      transactionHistory: [], // Initial transaction history
    };

    await axios.post(debitAccountUrl, debitAccountInfo);

    if(user.roundUpSavings===true){
        const savingsAccountInfo = {
            accountNumber: generateUniqueAccountNumber(),
            accountType: "Savings",
            userId: id,
            balance: 0, // Initial balance
            transactionHistory: [], // Initial transaction history
          };
      
          await axios.post(savingsAccountUrl, savingsAccountInfo);
      
    }
  };

  //Generating a random account number
  function generateUniqueAccountNumber() {
    let x = Math.floor(Math.random() * 100000000000 + 1);
    return x;
  }


    return ( 
    <div>
        <div>
             <RegisterNav/>
        </div>
        <form onSubmit={onSubmit}>
            <div className="card-body form_width ">
                <h2 className="top">Registration</h2>
                <div className="row">
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <input 
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={(e) => handleChange(e)}
                            className="form-control" 
                            placeholder="Name"
                            required></input>
                        </div>
                    </div>
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <input 
                            type="text"
                            name="email"
                            value={user.email}
                            onChange={e=>handleChange(e)}
                            className="form-control" 
                            placeholder="Email ID"
                            required></input>
                        </div>
                    </div>
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <input 
                            type="text"
                            name="mobile"
                            value={user.mobile}
                            onChange={e=>handleChange(e)}
                            className="form-control" 
                            placeholder="Mobile Number"
                            required></input>
                        </div>
                    </div>
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <input 
                            type="text"
                            name="dob"
                            value={user.dob}
                            onChange={e=>handleChange(e)}
                            className="form-control" 
                            placeholder="Date of Birth"
                            required></input>
                        </div>
                    </div>
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <input 
                            type="text"
                            name="address"
                            value={user.address}
                            onChange={e=>handleChange(e)}
                            className="form-control" 
                            placeholder="Address"
                            required></input>
                        </div>
                    </div>
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <input 
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={e=>handleChange(e)}
                            className="form-control" 
                            placeholder="Password"
                            required></input>
                        </div>
                    </div>
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <input 
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={e=>setConfirmPassword(e.target.value)}
                            className="form-control" 
                            placeholder="Confirm Password"
                            required></input>
                        </div>
                    </div>
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <input 
                            type="password"
                            name="pin"
                            value={user.pin}
                            onChange={e=>handleChange(e)}
                            className="form-control" 
                            placeholder="Create 4 digit pin"
                            required></input>
                        </div>
                    </div>
                        <table>
                            <tr>
                                <td className="right">Round Ups savings feature</td>
                                <td className="right">
                                    <label class="switch">  
                                    <input type="checkbox"
                                    name="roundUpSavings"
                                    id="roundUpSavings"
                                    onChange={e=>handleChange(e)}/>
                                    <span class="slider round"></span>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <br></br>
                            </tr>
                        </table>
                    </div>
                <button className="btn btn-light button" type="submit">Register</button>
            </div>
        </form>
    </div> 
    );
}

export default Register;