import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../script.css";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import RegisterNav from "../Navbar/RegisterNav";
import HeaderBar from "../Header/header";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    dob: "",
    pin: "",
    password: "",
    accountType: "Debit",
    roundUpSavings: false,
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const userUrl = "http://localhost:8080/user-management-service/user";

  //accounts url
  const debitAccountUrl =
    "http://localhost:8080/user-management-service/user/debitaccount";
  const savingsAccountUrl =
    "http://localhost:8080/user-management-service/user/savingsaccount";

  let navigate = useNavigate();
  const MSUsername = "MSUser";
  const MSPassword = "moneyAndMonitory";
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  function isEmailValid(email) {
    // Regular expression for a valid email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  function isDOBValid(dob) {
    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[0-2])[/]\d{4}$/;
    if (!dobRegex.test(dob)) {
      return false; // Invalid format
    }

    // Parse the DOB string into a Date object
    const dobParts = dob.split("/");
    const dobYear = parseInt(dobParts[2], 10);
    const currentYear = new Date().getFullYear();

    // Check if the year is less than the current year
    if (dobYear >= currentYear) {
      return false; // Year is not valid
    }

    return true; // Valid DOB
  }

  async function checkEmailExists(email) {
    try {
      const response = await axios.get(
        `http://localhost:8080/user-management-service/user/checkEmailExists/${email}`,
        {
          auth: {
            username: MSUsername,
            password: MSPassword,
          },
        }
      );
      console.log(response.data);
      return response.data; // The server should return a response with the "exists" property
    } catch (error) {
      console.error("Error checking email:", error);
      return false; // Handle the error gracefully
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "roundUpSavings") {
      setUser({ ...user, [name]: value });
    } else {
      const { name, checked } = e.target;
      setUser({ ...user, [name]: checked });
    }
    console.log(user.roundUpSavings);
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

    if (!isEmailValid(user.email)) {
      alert("Invalid email format");
      return;
    }

    const emailExists = await checkEmailExists(user.email);
    if (emailExists) {
      alert("Email already exists");
      return;
    }

    if (!isDOBValid(user.dob)) {
      alert("Invalid date of birth format (DD/MM/YYYY)");
      return;
    }

    if (!isPasswordValid) {
      // Display an error message for the invalid password
      alert("Invalid password");
      return;
    } else if (user.mobile.length != 10) {
      alert("Invalid phone number");
      return;
    } else if (user.password != confirmPassword) {
      alert("Password Missmatch");
      return;
    } else if (user.pin.length != 4) {
      alert("Pin should be 4 digit");
      return;
    }

    const res = await axios.post(userUrl, user, {
      auth: {
        username: MSUsername,
        password: MSPassword,
      },
    });
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

    if (user.roundUpSavings === true) {
      const savingsAccountInfo = {
        accountNumber: generateUniqueAccountNumber(),
        accountType: "Savings",
        userId: id,
        balance: 0, // Initial balance
        transactionHistory: [], // Initial transaction history
      };

      await axios.post(savingsAccountUrl, savingsAccountInfo, {
        auth: {
          username: MSUsername,
          password: MSPassword,
        },
      });
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
        <HeaderBar />
        <RegisterNav />
      </div>
      <div class="container">
        <div class="row">
          <div class="col" id="leftPanelLogin"></div>
          <div class="col">
            <div>
              <form onSubmit={onSubmit}>
                <div className="card-body2  mt-11 ">
                  <h2 className="top">JOIN US NOW</h2>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          value={user.name}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          placeholder="Name"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <input
                          type="text"
                          name="email"
                          value={user.email}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          placeholder="Email ID"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <input
                          type="text"
                          name="mobile"
                          value={user.mobile}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          placeholder="Mobile Number"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12 ">
                      <div className="form-group">
                        <input
                          type="text"
                          name="dob"
                          value={user.dob}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          placeholder="Date of Birth (DD/MM/YYYY)"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <input
                          type="text"
                          name="address"
                          value={user.address}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          placeholder="Address"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <input
                          type="password"
                          name="password"
                          value={user.password}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          placeholder="Password"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <input
                          type="password"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="form-control"
                          placeholder="Confirm Password"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <input
                          type="password"
                          name="pin"
                          value={user.pin}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          placeholder="Create 4 digit pin"
                          required
                        ></input>
                      </div>
                    </div>
                    <table>
                      <tr>
                        <td className="right" style={{ textAlign: "left" }}>
                          Round Ups savings feature
                        </td>
                        <td className="right">
                          <label class="switch">
                            <input
                              type="checkbox"
                              name="roundUpSavings"
                              id="roundUpSavings"
                              onChange={(e) => handleChange(e)}
                            />
                            <span class="slider round"></span>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <br></br>
                      </tr>
                    </table>
                  </div>
                  <button
                    className="btn btn-light button"
                    style={{ width: "40%" }}
                    type="submit"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
