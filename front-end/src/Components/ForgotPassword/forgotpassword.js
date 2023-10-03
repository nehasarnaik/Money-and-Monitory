import React, { useState } from 'react';

function ForgotPassword() {
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

  return (
    <div>
      <h2>Forgot Password</h2>
      <div>
        <label>Enter PIN:</label>
        <input type="text" value={pin} onChange={(e) => setPin(e.target.value)} />
      </div>
      <div>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirm New Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleChangePassword}>Change</button>
    </div>
  );
}

export default ForgotPassword;
