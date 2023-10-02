import React, {useState} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import "../../assets/css/passwordReset.css";

import check from '../../assets/images/loginReg/check.png'
import close from '../../assets/images/loginReg/close.png'

const PasswordReset = () => {

  const navigate = useNavigate()
  //add code to account for the requirement of a token
    
  const {confirmationPassword, setConfirmationPassword, password, setPassword, displayMessage, setDisplayMessage} = useAuth()

  const [resetPasswordSatisfied, setResetPasswordSatisfied] = useState()

  const newPasswordRequirements = ["> 6 characters", "1 number", "1 symbol", "match"]
    
  const handlePassword = (e) => {
    const value = e.target.value
    setPassword(value.toString())
  }

  const handleConfirmationPassword = (e) => {
    const value = e.target.value
    setConfirmationPassword(value.toString())

    if (value.length > 6 && value.match(/(\d+)/) && value.match(/[!-\/:-@[-`{-~]/) && value == password) {
      setResetPasswordSatisfied(true)
    }
    else {
      if (resetPasswordSatisfied) {
        setResetPasswordSatisfied(false)
      }
    }
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (password.length > 0 && confirmationPassword.length > 0) {
        try {
  
          const data = JSON.stringify({
            password: password
          });

          // ADD THE ENDPOINT WHEN YOU GET IT
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:3000/users/reset/${localStorage.getItem('resetToken')}`,
            headers: {
              'Content-Type': 'application/json'
            },
            data : data
          };
  
          const response = await axios.request(config)
  
          console.log(JSON.stringify(response.data))
  
          setDisplayMessage('Password Changed Successfully')
          localStorage.removeItem('resetToken')
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
        setDisplayMessage('Registration Details Incomplete')
        setTimeout(() => {
          setDisplayMessage('')
        }, 3000);
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
                <h2 className='log-reg-title'>Reset Password</h2>
                <div className={`input-idv-container`}>
                    <input
                    type="password"
                    id="password"
                    onChange={handlePassword}
                    value={password}
                    placeholder='password'
                    className='input-field password-field'/>
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
                      <p className={``}>{newPasswordRequirements[0]}</p><img className='requirement-icons' 
                      src={password.length > 6 ? check : close} 
                      alt={password.length > 6 ? "green color check to represent valid password length" : "red color cross to represent invalid password length"}></img>

                      <p className={``}>{newPasswordRequirements[1]}</p><img className='requirement-icons' 
                      src={password.match(/(\d+)/) ? check : close} 
                      alt={password.match(/(\d+)/) ? "green color check to represent a password containing a number" : "red color cross to represent a password not containing a number"}></img>

                      <p className={``}>{newPasswordRequirements[2]}</p><img className='requirement-icons' 
                      src={password.match(/[!-\/:-@[-`{-~]/) ? check : close} 
                      alt={password.match(/[!-\/:-@[-`{-~]/) ? "green color check representing a password containing a special character" : "red color cross representing a password not containing a special character"}></img>
                      
                      <p className={``}>{newPasswordRequirements[3]}</p><img className='requirement-icons' 
                      src={password.length > 6 && confirmationPassword == password ? check : close} 
                      alt={password.length > 6 && confirmationPassword == password ? "green color check representing matching passwords" : "red color cross representing mismatching passwords"}></img>
                    </div>
                </div>
                <input className='reset-btn' type="submit" value="Reset" />
              </form>
          </div>
          {displayMessage && <p className='white-text' id='result-message'>{displayMessage}</p>}
      </div>
      {displayMessage == "Password Changed Successfully" && <p className='white-text' id='exit-reset-page' onClick={() => returnToLogin}>Return to Login Page</p>}
      </>
  )
}

export default PasswordReset
