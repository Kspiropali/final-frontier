import React from 'react';
import "../../assets/css/login.css";

const Login = () => {

  const containerTitle = ["Return To Your WellSpace", "Create Your Own WellSpace", "Reset Password"]

  return (
    <>
    <h1 className='top-header yellow-text'>WellSpace</h1>
    {/* Container for the Login compents */}
    <div className='login-container'>
      <div className='log-reg-btn-container'>
        <button className='white-text log-reg-btn active-log-btn'>Login</button>
        <button className='white-text log-reg-btn'>Register</button>
      </div>
      <h2 className='log-reg-title'>fff</h2>
    </div>
    </>
  )
}

export default Login
