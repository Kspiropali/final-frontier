import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

const PreResetPassword = ({ setPreResetState }) => {

  const {email, setEmail, setDisplayMessage, displayMessage} = useAuth()

  function handleEmail(e){
    setEmail(e.target.value.toString())
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.length > 0) {
      try {

        const data = {
          email: email
        }
        await axios.post('http://localhost:8080/users', {
          headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body : data
        });

        setDisplayMessage('A password reset link has been sent. Please check your email')
        setEmail(''),
        setTimeout(() => {
          setDisplayMessage('')
        }, 3000);
      }
      catch (err){
        setDisplayMessage("An account doesn't exist for this email")
        setEmail(''),
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
    <form aria-label='pre-reset form'
    role="pre-reset"
    onSubmit={handleSubmit}>
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
    </form>
    <p className='yellow-text' id='return-to-login' onClick={() => setPreResetState(false)}>return to login</p>
    {displayMessage && <p>{displayMessage}</p>}
    </>
  )
}

export default PreResetPassword
