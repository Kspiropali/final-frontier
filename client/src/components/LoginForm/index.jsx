import React from 'react'

const LoginForm = () => {

    const handleUsername = () => {
        return
    }
    const handleInitialPassword = () => {
        return
    }
    const handleConfirmationPassword = () => {
        return
    }

  return (
    <>
    <form
        aria-label='login form'
        role="login"
        // onSubmit={handleSubmit}
      > 
        {/* <label>Username: </label> */}
        <input
          type="text"
          id="username"
        //   onChange={handleUsername}
        //   value="username"
          placeholder='username'
          required
         className='input-field'/>
         
        {/* <label>Email: </label> */}
        <input
          type="text"
          id="email"
        //   onChange={handleUsername}
        //   value="username"
          placeholder='email'
          required
         className='input-field'/>

        {/* <label>Confirm Email: </label> */}
        <input
          type="text"
          id="confirm-email"
        //   onChange={handleUsername}
        //   value="username"
          placeholder='confirm email'
          required
         className='input-field'/>

        {/* <label>Email: </label> */}
        <input
          type="text"
          id="password"
        //   onChange={handleUsername}
        //   value="username"
          placeholder='password'
          required
         className='input-field'/>

        {/* <label>Confirm Email: </label> */}
        <input
          type="text"
          id="confirm-password"
        //   onChange={handleUsername}
        //   value="username"
          placeholder='confirm password'
          required
         className='input-field no-match'/>

        {/* <label>Password: </label>
        <input
          type="password"
          id="password"
          onChange={handlePassword}
        //   value={password}
          placeholder='password'
          required
        /> */}

        {/* <input className='login' type="submit" value="Login" />
        {message && <p>{message}</p>} */}

      </form>
    </>
  )
}

export default LoginForm
