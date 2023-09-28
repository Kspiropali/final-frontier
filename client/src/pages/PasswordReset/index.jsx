import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

const PasswordReset = () => {
    
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
    
            const data = {
              password: password
            }
            await axios.post('http://localhost:8080/users', {
              headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body : data
            });
    
            setDisplayMessage('A password reset link has been sent')
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

    return (
        <>
        <h1 className='top-header'>Password Reset</h1>
        <form aria-label='password reset form'
        role="reset">

        </form>
        </>
    )
}

export default PasswordReset
