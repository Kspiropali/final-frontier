import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'

const PreResetPassword = ({ setPreResetState }) => {

  const {email, setEmail, setDisplayMessage, displayMessage} = useAuth()

  function handleEmail(e){
    setEmail(e.target.value.toString())
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.length > 0) {
      try {

        const data = JSON.stringify({
          email: email
        });

        // ADD THE END POINT WHEN YOU GET IT
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://127.0.0.1:3000/users/reset',
          headers: {
            'Content-Type': 'application/json'
          },
          data : data
        };

        const response = await axios.request(config)

        setDisplayMessage('A password reset link has been sent')
        setEmail(''),
        setTimeout(() => {
          setDisplayMessage('')
        }, 3000);
      }
      catch (err){
        // set the message based on the error (if 404 or 500)
        setDisplayMessage("An account doesn't exist for this email")
        setEmail(''),
        setTimeout(() => {
          setDisplayMessage('')
        }, 3000);
      }
    }
    else {
      console.log("incomplete form!")
      setDisplayMessage('No Email Provided')
      setTimeout(() => {
        setDisplayMessage('')
      }, 3000);
    }
  }

  return (
    <>
    <form aria-label='pre-reset form'
    role="pre-reset"
    onSubmit={handleSubmit}>
      <div className='input-idv-container'>
        <input
        type="email"
        id="email"
        onChange={handleEmail}
        value={email}
        placeholder='email'
        className='input-field'/>
      </div>
      <input className='login-btn' type="submit" value="Send" />
    </form>
    <p className='yellow-text' id='return-to-login' onClick={() => setPreResetState(false)}>return to login</p>
    </>
  )
}

export default PreResetPassword
