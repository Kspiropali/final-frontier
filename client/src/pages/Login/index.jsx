import React, { useEffect, useState } from 'react';
import "../../assets/css/login.css";
import { Loginform, RegistrationForm, OAuthButtons, OAuthLoginModule, PreResetPassword } from '../../components';
import { useAuth } from '../../contexts/AuthContext';


const Login = () => {

  const containerTitle = ["Return To Your WellSpace", "Create Your Own WellSpace", "Reset Password"]

  const {displayMessage, isLoggedIn} = useAuth()

  const [activePanel, setActivePanel] = useState('Login')
  const [preResetState, setPreResetState] = useState('')

  const [activeBtn, setActiveBtn] = useState('');
  
  const handlePanelToggle = (panelName) => {
    if (panelName == "Login") {
      setPreResetState(false)
    }
    setActivePanel(panelName)
  }

  // useEffect(() => {
  //   fetch("/users/ping", {method: "POST"})
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // },[])

  return (
    <>
    <div className="login-page">
    <h1 className='top-header yellow-text'>WellSpace</h1>
    {/* Container for the Login compents */}
    <div className='login-container'>
      <div className='log-reg-btn-container'>
        <button className={`white-text log-reg-btn ${activePanel === "Login" ? 'active-log-btn': ''}`} id='login-btn' onClick={() => handlePanelToggle('Login')}>Login</button>
        <button className={`white-text log-reg-btn ${activePanel === "Register" ? 'active-log-btn': ''}`} id='register-btn' onClick={() => handlePanelToggle('Register')}>Register</button>
      </div>
      <h2 className='log-reg-title'>{activePanel == "Register" ? containerTitle[1]: !preResetState ? containerTitle[0]: containerTitle[2]}</h2>
      <div className='input-area-container'>
        {activePanel == "Register" ? <RegistrationForm setActivePanel={setActivePanel}/> : !preResetState ? <Loginform setPreResetState={setPreResetState} /> : <PreResetPassword setPreResetState={setPreResetState} />}
        {!preResetState && activePanel == "Login" ? <OAuthButtons/> : ''}
      </div>
      {displayMessage && <p className='white-text' id='result-message'>{displayMessage}</p>}
    </div>
    </div>
    </>
  )
}

export default Login
