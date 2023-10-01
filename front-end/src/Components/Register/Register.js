import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../script.css'
import './Register.css'
import { Link } from "react-router-dom";

const Register = () => {
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[mobile,setMobile]=useState('');
    const[dob,setDoB]=useState('');
    const[address,setAddress]=useState('');
    const[aadhar,setAadhar]=useState('');
    const[password,setPassword]=useState('');
    const[confirmPassword,setConfirmPassword]=useState('');
    const navigate=useNavigate();

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
        <form >
            <div className="card-body form_width ">
                <h2 className="top">Registration</h2>
                <div className="row">
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <input 
                            value={name}
                            onChange={e=>setName(e.target.value)}
                            className="form-control" 
                            placeholder="Name"></input>
                        </div>
                    </div>
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <input 
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            className="form-control" 
                            placeholder="Email ID"></input>
                        </div>
                    </div>
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <input 
                            value={mobile}
                            onChange={e=>setMobile(e.target.value)}
                            className="form-control" 
                            placeholder="Mobile Number"></input>
                        </div>
                    </div>
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <input 
                            value={dob}
                            onChange={e=>setDoB(e.target.value)}
                            className="form-control" 
                            placeholder="Date of Birth"></input>
                        </div>
                    </div>
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <input 
                            value={address}
                            onChange={e=>setAddress(e.target.value)}
                            className="form-control" 
                            placeholder="Address"></input>
                        </div>
                    </div>
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <input 
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            className="form-control" 
                            placeholder="Password"></input>
                        </div>
                    </div>
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <input 
                            value={confirmPassword}
                            onChange={e=>setConfirmPassword(e.target.value)}
                            className="form-control" 
                            placeholder="Confirm Password"></input>
                        </div>
                    </div>
                        <table>
                            <tr>
                                <td className="right">Round Ups savings feature</td>
                                <td className="right">
                                    <label class="switch">  
                                    <input type="checkbox"/>
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