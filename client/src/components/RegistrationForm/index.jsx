import React, { useState, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha';

import check from '../../assets/images/loginReg/check.png'
import close from '../../assets/images/loginReg/close.png'

const RECAPTCHA_CLIENT_KEY = import.meta.env.VITE_API_RECAPTCHA_CLIENT_KEY

const RegistrationForm = ({setActivePanel}) => {
  const recaptchaRef = useRef(null);

  const {confirmationPassword, setConfirmationPassword, confirmationEmail, setConfirmationEmail, email, setEmail, password, setPassword, username, setUsername, displayMessage, setDisplayMessage} = useAuth()

  const [regPasswordSatisfied, setRegPasswordSatisfied] = useState()
  const [regEmailSatisfied, setRegEmailSatisfied] = useState()
  const [regUsernameSatisfied, setRegUsernameSatisfied] = useState()

  const passwordRequirements = ["> 6 characters", "1 number", "1 symbol", "match"]
  const emailRequirements = ["contains '@'", 'match']
  const usernameRequirements = ["unique"]
  
  const handleUsername = (e) => {
    const value = e.target.value
    setUsername(value.toString())

    // ADD TO THIS RULE
    if (username.length > 3) {
      setRegUsernameSatisfied(true)
    }
    else {
      if (regUsernameSatisfied) {
        setRegUsernameSatisfied(false)
      }
    }
  }
  const handlePassword = (e) => {
    const value = e.target.value
    setPassword(value.toString())
  }
  const handleConfirmationPassword = (e) => {
    const value = e.target.value
    setConfirmationPassword(value.toString())

    if (value.length > 6 && value.match(/(\d+)/) && value.match(/[!-\/:-@[-`{-~]/) && value == password) {
      setRegPasswordSatisfied(true)
    }
    else {
      if (regPasswordSatisfied) {
        setRegPasswordSatisfied(false)
      }
    }
  }
  function handleEmail(e){
    const value = e.target.value
      setEmail(value.toString())
  }
  const handleConfirmationEmail = (e) => {
    const value = e.target.value
    setConfirmationEmail(value.toString())
    
    if (value.includes('@') && value.match(/(\d+)/) && value == email) {
      setRegEmailSatisfied(true)
    }
    else {
      if (regEmailSatisfied) {
        setRegEmailSatisfied(false)
      }
    }
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (regPasswordSatisfied, regEmailSatisfied, regUsernameSatisfied) {
      try {

        const data = JSON.stringify({
          username: username,
          password: password,
          email: email
          // "g-recaptcha-response": await recaptchaRef.current.getValue(),
        });

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://127.0.0.1:3000/users/register',
          headers: {
            'Content-Type': 'application/json'
          },
          data : data
        };

        const response = await axios.request(config)

        console.log(JSON.stringify(response.data))

        setDisplayMessage('Registration Successful. You can now login')
        setUsername(''),
        setPassword(''),
        setConfirmationPassword(''),
        setEmail(''),
        setConfirmationEmail('')
        setTimeout(() => {
          setDisplayMessage('')
          setActivePanel('Login')
        }, 3000);
      }
      catch (err){
        setDisplayMessage('Registration Unsuccessful')
        setUsername(''),
        setPassword(''),
        setConfirmationPassword(''),
        setEmail(''),
        setConfirmationEmail('')
        setTimeout(() => {
          setDisplayMessage('')
        }, 3000);
      }
    }
    else {
      console.log("incomplete form!")
      setDisplayMessage('Registration Details Incomplete')
      setTimeout(() => {
        setDisplayMessage('')
      }, 3000);
    }

    // recaptchaRef.current.reset();
  }
  return (
    <>
    <form
    aria-label='register form'
    role="register"
    onSubmit={handleSubmit}
    >
      <div className='input-idv-container'>
        <input
          type="username"
          id="username"
          onChange={handleUsername}
          value={username}
          placeholder='username' 
          autoComplete='off'
          className={`input-field`}/>
        <div className='requirements-container'>
          <p className='reg-req-text'>{usernameRequirements[0]}</p><img className='requirement-icons' 
          src={username.length > 3 && regUsernameSatisfied ? check : close}
          alt={regUsernameSatisfied ? "green color check to represent valid username" : "red color cross to represent invalid username"}></img>
        </div>
      </div>
      <div className='input-idv-container'>
          <input
          type="email"
          id="email"
          onChange={handleEmail}
          value={email}
          placeholder='email'
          className='input-field'/>
          <div className='requirements-container'>
          </div>
      </div>
      <div className='input-idv-container'>
          <input
          type="email"
          id="confirm-email"
          onChange={handleConfirmationEmail}
          value={confirmationEmail}
          placeholder='confirm email'
          className='input-field'/>
          <div className='requirements-container'>
            <p className='reg-req-text'>{emailRequirements[0]}</p><img className='requirement-icons'
            src={email.includes('@') ? check : close} 
            alt={email.includes('@') ? "green color check to represent a valid email" : "red color cross to represent an invalid email"}></img>
            <p className='reg-req-text'>{emailRequirements[1]}</p><img className='requirement-icons'
            src={email.includes('@') && confirmationEmail == email ? check : close} 
            alt={email.includes('@') && confirmationEmail == email ? "green color check to represent matching emails" : "red color cross to represent mismatching emails"}></img>
          </div>
      </div>
      <div className={`input-idv-container`}>
          <input
          type="password"
          id="password"
          onChange={handlePassword}
          value={password}
          placeholder='password'
          className='input-field password-field'/>
          <div className='requirements-container'>
          </div>
      </div>
      <div className='input-idv-container'>
          <input
          type="password"
          id="confirm-password"
          onChange={handleConfirmationPassword}
          value={confirmationPassword}
          placeholder='confirm password'
          className='input-field password-field'/>
          <div className='requirements-container'>
            <p className='reg-req-text'>{passwordRequirements[0]}</p><img className='requirement-icons' 
            src={password.length > 6 ? check : close} 
            alt={password.length > 6 ? "green color check to represent valid password length" : "red color cross to represent invalid password length"}></img>

            <p className='reg-req-text'>{passwordRequirements[1]}</p><img className='requirement-icons' 
            src={password.match(/(\d+)/) ? check : close} 
            alt={password.match(/(\d+)/) ? "green color check to represent a password containing a number" : "red color cross to represent a password not containing a number"}></img>

            <p className='reg-req-text'>{passwordRequirements[2]}</p><img className='requirement-icons' 
            src={password.match(/[!-\/:-@[-`{-~]/) ? check : close} 
            alt={password.match(/[!-\/:-@[-`{-~]/) ? "green color check representing a password containing a special character" : "red color cross representing a password not containing a special character"}></img>
            
            <p className='reg-req-text'>{passwordRequirements[3]}</p><img className='requirement-icons' 
            src={password.length > 6 && confirmationPassword == password ? check : close} 
            alt={password.length > 6 && confirmationPassword == password ? "green color check representing matching passwords" : "red color cross representing mismatching passwords"}></img>
          </div>
      </div>
      {RECAPTCHA_CLIENT_KEY &&
        <ReCAPTCHA style={{marginLeft: 210}} ref={recaptchaRef} theme="dark" sitekey={RECAPTCHA_CLIENT_KEY} />}
      <input className='login-btn' type="submit" value="Register" />
    </form>
    </>
  )

}

export default RegistrationForm
