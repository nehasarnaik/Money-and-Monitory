import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css';
import { useUser } from '../../UserContext';
import axios from 'axios'; // Make sure you have Axios installed
import RegisterNav from '../Navbar/RegisterNav';
import HeaderBar from '../Header/header';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { updateUser } = useUser();

   

    const handleLogin = async (e) => {
        e.preventDefault();
        var MSUsername = 'MSUser';
        var MSPassword = 'moneyAndMonitory';    
        try {
            // Make the first request to validate the username and password
            const response = await axios.get(`http://localhost:8080/user-management-service/user/${username}/${password}`, {
                auth: {
                  username: MSUsername,
                  password: MSPassword
                }
              });

            if (response.data) {
                // If the first request succeeds, make the second request to get user data
                const response1 = await axios.get(`http://localhost:8080/user-management-service/user/${username}`, {
                    auth: {
                        username: MSUsername,
                        password: MSPassword
                      }
                });
                const userData = response1.data;
                console.log(userData);
                updateUser(userData);
                navigate('/dashboard');
            } else {
                setError("Invalid email or password");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <div>
                <HeaderBar/>
               <RegisterNav></RegisterNav>
            </div>
            <div className="login-container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4 custom-column">
                        <div class="card">
                            <div className="card-body">
                                <h3 className="card-title text-center violet-text bold-text">Login</h3>
                                <form>
                                    <div className="form-group mb-3 mt-4">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Email ID"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    {error && ( // Display the error message if error is not null
                                        <p className="error-message">
                                            {error}
                                        </p>
                                    )}
                                   <button
                                        type="submit"
                                        className={`btn btn-primary btn-block custom-button ${error ? '' : 'mt-4'}`}
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </button>
                                </form>
                                <p className="mt-3 text-center white-text">
                                    Don't have an account? <Link to="/register" className="violet-link">Register</Link>
                                </p>
                                <p className="mt-3 text-center white-text">
                                     <Link to="/forgotpassword" className="violet-link">Forgot Password?</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
