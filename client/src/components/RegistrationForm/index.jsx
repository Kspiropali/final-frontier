import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'

const RegistrationForm = () => {
  
  const {confirmationPassword, setConfirmationPassword, confirmationEmail, setConfirmationEmail, email, setEmail, password, setPassword, username, setUsername, displayMessage, setDisplayMessage} = useAuth()

  
  const handleUsername = (e) => {
    setUsername(e.target.value.toString())
  }
  const handlePassword = (e) => {
      setPassword(e.target.value.toString())
  }
  const handleConfirmationPassword = (e) => {
      setConfirmationPassword(e.target.value.toString())
  }
  function handleEmail(e){
      setEmail(e.target.value.toString())
  }
  const handleConfirmationEmail = (e) => {
      setConfirmationEmail(e.target.value.toString())
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length > 0 && password.length > 0 && confirmationPassword.length > 0 && email.length > 0 && confirmationEmail.length > 0) {
      try {

        const data = {
          username: username,
          password: password,
          email: email
        }
        await axios.post('http://localhost:8080/users', {
          headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body : data
        });

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
            className='input-field'/>
        {/* <p>cannot be changed</p> */}
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
          className='input-field'/>
          <p>must contain: 7-15 characters, 1 number & 1 symbol </p>
      </div>
      <div className='input-idv-container'>
          <input
          type="password"
          id="confirm-password"
          onChange={handleConfirmationPassword}
          value={confirmationPassword}
          placeholder='confirm password'
          required
          className='input-field no-match'/>
          <p>emails do not match</p>
      </div>
      <input className='login-btn' type="submit" value="Register" />
      {/* {displayMessage && <p>{displayMessage}</p>} */}

    </form>
    </>
  )

}

export default RegistrationForm
