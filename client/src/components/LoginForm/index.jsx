import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({setPreResetState}) => {

  const navigate = useNavigate()

    const {username, setUsername, password, setPassword, setDisplayMessage, isLoggedIn, setIsLoggedIn} = useAuth()

    const handleUsername = (e) => {
      const value = e.target.value
      setUsername(value.toString())
      
    }
    const handlePassword = (e) => {
      const value = e.target.value
      setPassword(value.toString())

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username.length > 0 && password.length > 0) {
          try {
    
            const data = JSON.stringify({
              username: username,
              password: password
            });
    
            let config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: '/users/login',
              headers: {
                'Content-Type': 'application/json'
              },
              data : data
            };
    
            const response = await axios.request(config)

            console.log(response)
            if (response.status == 200){
              setDisplayMessage('Login Successful')
              setUsername('');
              setPassword('');
              setTimeout(() => {
                setDisplayMessage('')
                setIsLoggedIn(true)
                navigate('/');
              }, 2000);
            }
            
          }
          catch (err){
            setDisplayMessage('Invalid username or password')
            setTimeout(() => {
              setDisplayMessage('')
            }, 3000);
          }
        }
        else {
          console.log("incomplete form!")
          setDisplayMessage('Login Details Incomplete')
          setTimeout(() => {
            setDisplayMessage('')
          }, 3000);
        }
      }

  return (
    <>
    <form aria-label='login form' role='login' onSubmit={handleSubmit}>
        <div className='input-idv-container'>
            <input
                type="username"
                id="username"
                onChange={handleUsername}
                placeholder='username'
                className='input-field'/>
        </div>
        <div className='input-idv-container'>
            <input
            type="password"
            id="password"
            onChange={handlePassword}
            placeholder='password'
            className='input-field password-field'/>
        </div>

        <input aria-label='submit button' role='submit' className='login-btn' type="submit" value="Login" />
    </form>
    <p className='yellow-text has-pointer' id='forgot-password' onClick={() => setPreResetState(true)}>forgot password?</p>
    </>
  )
}

export default LoginForm
