import React, { useEffect, useState } from 'react';
import "../../assets/css/login.css";
import { Loginform, RegistrationForm, OAuthButtons, OAuthLoginModule, ResetPassword } from '../../components';


const Login = () => {

  const containerTitle = ["Return To Your WellSpace", "Create Your Own WellSpace", "Reset Password"]

  const [activePanel, setActivePanel] = useState('Login')
  const [resultMessage, setResultMessage] = useState()

  const handlePanelToggle = (e) => {
    setActivePanel(e.target.value)
  }

  // useEffect(() => {

  // }, [activePanel])

  return (
    <>
    <h1 className='top-header yellow-text'>WellSpace</h1>
    {/* Container for the Login compents */}
    <div className='login-container'>
      <div className='log-reg-btn-container'>
        <button className={`white-text log-reg-btn ${activePanel === "Login" ? 'active-log-btn': ''}`} id='login-btn' onClick={handlePanelToggle}>Login</button>
        <button className={`white-text log-reg-btn ${activePanel === "Register" ? 'active-log-btn': ''}`} id='register-btn' onClick={handlePanelToggle}>Register</button>
      </div>
      <h2 className='log-reg-title'>{containerTitle[0]}</h2>
      <div className='input-area-container'>
        {activePanel == "Register" ? (<RegistrationForm/>) : (<Loginform/>)}
      </div>
    </div>
    </>
  )
}

export default Login
