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
              url: 'http://localhost:3000/users/login',
              headers: {
                'Content-Type': 'application/json'
              },
              data : data
            };
    
            const response = await axios.request(config)

            console.log(response)
    
            setDisplayMessage('Registration Successful. You can now login')
            setUsername('');
            setPassword('');
            setTimeout(() => {
              setDisplayMessage('')
              navigate('/');
            }, 2000);
          }
          catch (err){
            setDisplayMessage('Invalid username or password')
            setUsername(''),
            setPassword(''),
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
            {/* <label>Username: </label> */}
            <input
                type="text"
                id="username"
                onChange={handleUsername}
            //   value="username"
                placeholder='username'
                className='input-field'/>
            {/* <p>cannot be changed</p> */}
        </div>
        <div className='input-idv-container'>
            {/* <label>Password: </label> */}
            <input
            type="password"
            id="password"
            onChange={handlePassword}
            //   value="password"
            placeholder='password'
            className='input-field white-text password-field'/>
        </div>
        <input className='login-btn' type="submit" value="Login" />
    </form>
    {/* MOVE THIS p TO LOGIN 'PAGE' FILE ONCE CONTEXTS ARE SET */}
    <p className='yellow-text' id='forgot-password' onClick={() => setPreResetState(true)}>forgot password?</p>
    </>
  )
}

export default LoginForm
