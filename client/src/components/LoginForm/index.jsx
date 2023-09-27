import React from 'react'

const LoginForm = () => {

    const handleUsername = () => {
        return
    }
    const handlePassword = () => {
        return
    }

    const renderPasswordReset = () => {
        return
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
            type="text"
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
