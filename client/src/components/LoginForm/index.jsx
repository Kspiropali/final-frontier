import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'


const LoginForm = ({setPrePasswordState}) => {

    const {username, setUsername, password, setPassword} = useAuth()

    const handleUsername = (e) => {
        setUsername(e.target.value.toString())
    }
    const handlePassword = (e) => {
        setPassword(e.target.value.toString())
    }

    const renderPasswordReset = (e) => {
        // a redirect
        return
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username.length)
        console.log(password.length)
        if (username.length > 0 && password.length > 0) {
          try {
    
            const data = {
              username: username,
              password: password
            }
            const response = await axios.post('http://localhost:8080/users', {
              headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body : data
            });

            console.log(response)
            //const token == response.headers.authorization
            //add token to cookies storage
    
            setDisplayMessage('Registration Successful. You can now login')
            setUsername(''),
            setPassword('')
            setTimeout(() => {
              setDisplayMessage('')
            }, 3000);
          }
          catch (err){
            setDisplayMessage('Registration Unsuccessful')
            setUsername(''),
            setPassword(''),
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
    <form aria-label='login form' role='login' onSubmit={handleSubmit}>
        <div className='input-idv-container'>
            {/* <label>Username: </label> */}
            <input
                type="text"
                id="username"
                onChange={handleUsername}
            //   value="username"
                placeholder='username'
                required
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
            required
            className='input-field'/>
        </div>
        <input className='login-btn' type="submit" value="Login" />
    </form>
    {/* MOVE THIS p TO LOGIN 'PAGE' FILE ONCE CONTEXTS ARE SET */}
    <p className='yellow-text' id='forgot-password' onClick={() => renderPasswordReset}>forgot password?</p>
    </>
  )
}

export default LoginForm
