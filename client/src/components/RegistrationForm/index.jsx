import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'

import check from '../../assets/images/loginReg/check.png'
import close from '../../assets/images/loginReg/close.png'

const RegistrationForm = ({setActivePanel}) => {
  
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
          className={`input-field`}/>
        <div className='requirements-container'>
          <p className={``}>{usernameRequirements[0]}</p><img className='requirement-icons' src={username.length > 3 && regUsernameSatisfied ? check : close}></img>
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
            <p className={``}>{emailRequirements[0]}</p><img className='requirement-icons' src={email.includes('@') ? check : close}></img>
            <p className={``}>{emailRequirements[1]}</p><img className='requirement-icons' src={email.includes('@') && confirmationEmail == email ? check : close}></img>
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
            <p className={``}>{passwordRequirements[0]}</p><img className='requirement-icons' src={password.length > 6 ? check : close}></img>
            <p className={``}>{passwordRequirements[1]}</p><img className='requirement-icons' src={password.match(/(\d+)/) ? check : close}></img>
            <p className={``}>{passwordRequirements[2]}</p><img className='requirement-icons' src={password.match(/[!-\/:-@[-`{-~]/) ? check : close}></img>
            <p className={``}>{passwordRequirements[3]}</p><img className='requirement-icons' src={password.length > 6 && confirmationPassword == password ? check : close}></img>
          </div>
      </div>
      <input className='login-btn' type="submit" value="Register" />
    </form>
    </>
  )

}

export default RegistrationForm
