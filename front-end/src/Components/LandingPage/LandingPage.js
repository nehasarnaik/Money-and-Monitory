import React from 'react';
import './LandingPage.css'
import { Link } from 'react-router-dom';
function LandingPage() {
  return (
    <>
    <header style={{width: "-webkit-fill-available"}}>
      <div class="px-3 py-2 text-white" style={{backgroundColor:"rgb(107 44 177)"}}>
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
              <div class="logo">
                <img src="icon-removebg.png" alt="Product Icon"/>
                <h1 class="display-1">Coin Stash</h1>
            </div>
            </a>
            <a class="btn" role="button"><Link to={'/register'} class="nav-link padding"><h1 className='display-6'>Register</h1></Link></a>
            <a class="btn" role="button"><Link to={'/login'} class="nav-link padding"><h1 className='display-6'>Login</h1></Link></a>
          </div>
            
        </div>
      </div>
    </header>
    <div class="position-left text-left left-half text-white">
      <div class="col-md-10">
        <h1 class="display-6 padding-top">Banking Made Easier</h1>
        <p class="lead font-weight-normal padding">Welcome to Coin Stash, where smart banking meets effortless saving! Discover our innovative 'RoundUp Savings' feature – every transaction you make gets rounded up, and the extra change goes straight into your savings account. It's a simple, automatic way to cultivate the habit of saving while you manage your finances. Start rounding up and watch your savings grow. Join us on the journey to financial empowerment today</p>
            
      </div>
    </div>
    
    {/* <div className=" left-half"></div> */}
    {/* <footer class="container py-5">
      <div class="row">
        <div class="col-12 col-md">
          <small class="d-block mb-3 text-muted">© 2023</small>
        </div>
        <div class="col-6 col-md">
          <h5>Features</h5>
          
        </div>
        <div class="col-6 col-md">
          <h5>Resources</h5>
          
        </div>
        <div class="col-6 col-md">
          <h5>Resources</h5>
          
        </div>
        <div class="col-6 col-md">
          <h5>About</h5>
        </div>
      </div>
    </footer> */}
    </>
  );
}

export default LandingPage;