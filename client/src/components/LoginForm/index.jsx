import React from 'react'
import { useAuth } from '../../contexts/AuthContext'


const LoginForm = () => {

    const {username, setUsername, password, setPassword} = useAuth()

    const handleUsername = () => {
        setUsername(e.target.value.toString())
    }
    const handlePassword = () => {
        setPassword(e.target.value.toString())
    }

    const renderPasswordReset = () => {
        // a redirect
        return
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.length > 0 && password.length > 0 && confirmationPassword.length > 0 && email.length > 0 && confirmationEmail.length > 0) {
          try {
    
            const data = {
              username: username,
              password: password
            }
            response = await axios.post('http://localhost:8080/users', {
              headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body : data
            });

            console.log(response.status)
    
            setDisplayMessage('Registration Successful. You can now login')
            setUsername(''),
            setPassword(''),
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
    <form aria-label='login form' role='login'>
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
    </form>
    {/* MOVE THIS p TO LOGIN 'PAGE' FILE ONCE CONTEXTS ARE SET */}
    <p className='yellow-text' id='forgot-password' onClick={() => renderPasswordReset}>forgot password?</p>
    </>
  )
}

export default LoginForm
