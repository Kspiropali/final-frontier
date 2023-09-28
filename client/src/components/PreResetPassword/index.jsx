import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

const PreResetPassword = () => {

  const {email, setEmail} = useAuth
  
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

        setDisplayMessage('Registration Successful. You can now login')
        setEmail(''),
        setTimeout(() => {
          // setDisplayMessage('')
        }, 3000);
      }
      catch (err){
        setDisplayMessage('Registration Unsuccessful')
        setEmail(''),
        setTimeout(() => {
          // setDisplayMessage('')
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

    </form>
    </>
  )
}

export default PreResetPassword
