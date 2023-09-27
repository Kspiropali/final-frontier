import React from 'react';
import "../../assets/css/login.css";
import { Loginform, RegistrationForm, OAuthButtons, OAuthLoginModule, ResetPassword } from '../../components';


const Login = () => {

  const containerTitle = ["Return To Your WellSpace", "Create Your Own WellSpace", "Reset Password"]

  const activePanel = "login"

  return (
    <>
    <h1 className='top-header yellow-text'>WellSpace</h1>
    {/* Container for the Login compents */}
    <div className='login-container'>
      <div className='log-reg-btn-container'>
        <button className='white-text log-reg-btn' id='active-log-btn'>Login</button>
        <button className='white-text log-reg-btn'>Register</button>
      </div>
      <h2 className='log-reg-title'>{containerTitle[0]}</h2>
      <div className='input-area-container'>
        <RegistrationForm/>
      </div>
    </div>
    </>
  )
}

export default Login
