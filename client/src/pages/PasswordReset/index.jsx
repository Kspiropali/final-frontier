import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { NavLink, Outlet } from 'react-router-dom';
import "../../assets/css/passwordReset.css";


const PasswordReset = () => {

  //add code to account for the requirement of a token
    
  const {confirmationPassword, setConfirmationPassword, password, setPassword, displayMessage, setDisplayMessage} = useAuth()
    
  const handlePassword = (e) => {
      setPassword(e.target.value.toString())
  }

  const handleConfirmationPassword = (e) => {
      setConfirmationPassword(e.target.value.toString())
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (password.length > 0 && confirmationPassword.length > 0) {
        try {
  
          const data = JSON.stringify({
            password: password
          });

          // ADD THE ENDPOINT WHEN YOU GET IT
          // let config = {
          //   method: 'post',
          //   maxBodyLength: Infinity,
          //   url: 'http://127.0.0.1:3000/',
          //   headers: {
          //     'Content-Type': 'application/json'
          //   },
          //   data : data
          // };
  
          const response = await axios.request(config)
  
          console.log(JSON.stringify(response.data))
  
  
          setDisplayMessage('Password Changed Successfully')
          setPassword(''),
          setConfirmationPassword(''),
          setTimeout(() => {
            setDisplayMessage('')
          }, 3000);
        }
        catch (err){
          // only error if there's a server error 500
          setDisplayMessage("Failed to reset password. Try again")
          setPassword(''),
          setConfirmationPassword(''),
          setTimeout(() => {
            setDisplayMessage('')
          }, 3000);
        }
      }
      else {
        console.log("incomplete form!")
      }
    }

    const returnToLogin = () => {
      //redirect
      return
    }

  return (
      <>
      <h1 className='top-header'>WellSpace</h1>
      <div className='login-container' id='password-reset-box'>
          <div className='input-area-container'>
              <form aria-label='password reset form'
              role="reset"
              onSubmit={handleSubmit}>
                  <div className='input-idv-container'>
                      <h2 className='log-reg-title'>Reset Password</h2>
                      <input
                      type="password"
                      id="password"
                      onChange={handlePassword}
                      value={password}
                      placeholder='password'
                      required
                      className='input-field white-text password-field'/>
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
                      className='input-field white-text password-field no-match'/>
                      <p>passwords do not match</p>
                  </div>
              </form>
          </div>
          {displayMessage && <p className='white-text' id='result-message'>{displayMessage}</p>}
      </div>
      {displayMessage == "Password Changed Successfully" && <p className='white-text' id='exit-reset-page'  onClick={() => returnToLogin}>Return to Login Page</p>}
      </>
  )
}

export default PasswordReset
