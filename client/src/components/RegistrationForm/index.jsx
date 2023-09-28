import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'

const RegistrationForm = () => {
  
  const {confirmationPassword, setConfirmationPassword, confirmationEmail, setConfirmationEmail, email, setEmail, password, setPassword, username, setUsername, displayMessage, setDisplayMessage} = useAuth()

  let usernameSatisfied ;
  let emailSatisfied ;
  let confirmationEmailSatisfied ;
  let passwordSatisfied ;
  let confirmationPasswordSatisfied ;
  
  const handleUsername = (e) => {
    const value = e.target.value
    setUsername(value.toString())

  }
  const handlePassword = (e) => {
    const value = e.target.value
      setPassword(value.toString())
  }
  const handleConfirmationPassword = (e) => {
    const value = e.target.value
      setConfirmationPassword(value.toString())
  }
  function handleEmail(e){
    const value = e.target.value
      setEmail(value.toString())
  }
  const handleConfirmationEmail = (e) => {
    const value = e.target.value
      setConfirmationEmail(value.toString())
  }

  function checkUsername(username){
    if (username < 2) {
      return [false, "too short"]
    }
  }
  function checkPassword(username){
    if (username < 2) {
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length > 0 && password.length > 0 && confirmationPassword.length > 0 && email.length > 0 && confirmationEmail.length > 0) {
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
            type="text"
            id="username"
            onChange={handleUsername}
            value={username}
            placeholder='username'
            required
            className={`input-field`}/>
      </div>
      <div className='input-idv-container'>
          <input
          type="text"
          id="email"
          onChange={handleEmail}
          value={email}
          placeholder='email'
          required
          className='input-field'/>
          <p>must contain @</p>
      </div>
      <div className='input-idv-container'>
          <input
          type="text"
          id="confirm-email"
          onChange={handleConfirmationEmail}
          value={confirmationEmail}
          placeholder='confirm email'
          required
          className='input-field'/>
          <p>emails do not match</p>
      </div>
      <div className='input-idv-container'>
          <input
          type="password"
          id="password"
          onChange={handlePassword}
          value={password}
          placeholder='password'
          required
          className='input-field white-text password-field'/>
          <p>{'must contain at least: 6 characters, 1 Uppercase, 0-9 & 1 symbol'} </p>
      </div>
      <div className='input-idv-container'>
          <input
          type="password"
          id="confirm-password"
          onChange={handleConfirmationPassword}
          value={confirmationPassword}
          placeholder='confirm password'
          required
          className='input-field white-text password-field no-match'/>
          <p>passwords do not match</p>
      </div>
      <input className='login-btn' type="submit" value="Register" />
    </form>
    </>
  )

}

export default RegistrationForm
