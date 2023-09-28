import React, { useEffect, useState } from 'react';
import "../../assets/css/login.css";
import { Loginform, RegistrationForm, OAuthButtons, OAuthLoginModule, PreResetPassword } from '../../components';


const Login = () => {

  const containerTitle = ["Return To Your WellSpace", "Create Your Own WellSpace", "Reset Password"]

  const [activePanel, setActivePanel] = useState('')
  const [resultMessage, setResultMessage] = useState()
  const [prePasswordState, setPrePasswordState] = useState('')

  const handlePanelToggle = (panelName) => {

    setActivePanel(panelName)
  }

  return (
    <>
    <h1 className='top-header yellow-text'>WellSpace</h1>
    {/* Container for the Login compents */}
    <div className='login-container'>
      <div className='log-reg-btn-container'>
        <button className={`white-text log-reg-btn ${activePanel === "Login" ? 'active-log-btn': ''}`} id='login-btn' onClick={() => handlePanelToggle('Login')}>Login</button>
        <button className={`white-text log-reg-btn ${activePanel === "Register" ? 'active-log-btn': ''}`} id='register-btn' onClick={() => handlePanelToggle('Register')}>Register</button>
      </div>
      <h2 className='log-reg-title'>{containerTitle[0]}</h2>
      <div className='input-area-container'>
        {activePanel == "Register" ? <RegistrationForm/> : <Loginform/>}
      </div>
    </div>
    </>
  )
}

export default Login
