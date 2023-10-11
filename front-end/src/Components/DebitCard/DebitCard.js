import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./DebitCard.css"
import { useUser } from '../../UserContext';
import axios from 'axios'; // Make sure you have Axios installed


const DebitCard = () => {

    const { user } = useUser();
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
            <div class="container">
    <div class="Debitcard">
        <span class="line-1"></span>
        <span class="line-2"></span>
        <span class="line-3"></span>
        <div class="top-row">
            <div class="visa">
                <h6>Coin Stash</h6>
                <h5>{user.name}</h5>
            </div>
            <div class="tick">
                <i class="fa fa-check"></i>
            </div>
            
        </div>
        
      
        <div class="bottom-row">
        <p class="bottom-row">CardNumber</p>
                <div class="dots">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
               
                <span class="number">4564</span>
        </div>
      
        
    </div>
    
</div>
        </div>
    );
};

export default DebitCard;
