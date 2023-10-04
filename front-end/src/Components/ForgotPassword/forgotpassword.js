import React, { useState } from 'react';
import { Link } from "react-router-dom";

function ForgotPassword() {

  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      // Passwords match, you can proceed with changing the password
      // You can add your logic to update the password in your backend here
      console.log('Password changed successfully');
    } else {
      
      setError('Passwords do not match');
    }
  };

  // return (
  //   <div>
  //     <h2>Forgot Password</h2>
  //     <div>
  //       <label>Enter PIN:</label>
  //       <input type="text" value={pin} onChange={(e) => setPin(e.target.value)} />
  //     </div>
  //     <div>
  //       <label>New Password:</label>
  //       <input
  //         type="password"
  //         value={newPassword}
  //         onChange={(e) => setNewPassword(e.target.value)}
  //       />
  //     </div>
  //     <div>
  //       <label>Confirm New Password:</label>
  //       <input
  //         type="password"
  //         value={confirmPassword}
  //         onChange={(e) => setConfirmPassword(e.target.value)}
  //       />
  //     </div>
  //     {error && <p style={{ color: 'red' }}>{error}</p>}
  //     <button onClick={handleChangePassword}>Change</button>
  //   </div>
  // );

  return (
    <div>
        <div>
            <nav class="navbar navbar-expand-lg  nav background">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <Link className="nav-link"></Link>
                        </li>
                        <li class="nav-item">
                            <Link to={'/register'} class="nav-link padding">Register</Link>
                        </li>
                        <li class="nav-item">
                            <Link to={'/login'} class="nav-link padding">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

        <div className="login-container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4 custom-column">
                    <div class="card">
                        <div className="card-body">
                            <h3 className="card-title text-center violet-text bold-text">Forgot Password?</h3>
                            <form>
                              <div className="form-group mb-3 mt-4">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Email ID"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3 mt-4">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Pin"
                                        required
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3 mt-4">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Set new password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3 mt-4">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Confirm password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4 custom-button"
                                    onClick={handleChangePassword}
                                >
                                    Change Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default ForgotPassword;
