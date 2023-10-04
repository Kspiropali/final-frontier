import React, {useRef} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha';


const RECAPTCHA_CLIENT_KEY = import.meta.env.VITE_API_RECAPTCHA_CLIENT_KEY

const LoginForm = ({setPreResetState}) => {
  const recaptchaRef = useRef(null);
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
		const token = await recaptchaRef.current.getValue();
		if(!token){
			setDisplayMessage('Please complete the captcha')
			setTimeout(() => {
				setDisplayMessage('')
			}, 3000);
			return
		}
        if (username.length > 0 && password.length > 0) {
          try {
    
            const data = JSON.stringify({
              username: username,
              password: password,
              'g-recaptcha-response': token,
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

        recaptchaRef.current.reset();
      }

  return (
    <>
    <form aria-label='login form' role='login' onSubmit={handleSubmit}>
        <div className='input-idv-container'>
            {/* <label>Username: </label> */}
            <input
                type="username"
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
		{RECAPTCHA_CLIENT_KEY && <ReCAPTCHA style={{marginLeft: 210}} ref={recaptchaRef} theme="dark" sitekey={RECAPTCHA_CLIENT_KEY} />}
        <input aria-label='submit button' role='submit' className='login-btn' type="submit" value="Login" />
    </form>
    <a href="#">
    <p className='yellow-text' id='forgot-password' onClick={() => setPreResetState(true)}>forgot password?</p></a>
    </>
  )
}

export default LoginForm
