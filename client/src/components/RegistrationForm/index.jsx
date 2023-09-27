import React from 'react'

const RegistrationForm = () => {

  const handleUsername = () => {
    return
  }
  const handlePassword = () => {
      return
  }
  const handleConfirmationPassword = () => {
      return
  }
  const handleEmail = () => {
      return
  }
  const handleConfirmationEmail = () => {
      return
  }

  return (
    <>
    <form
    aria-label='register form'
    role="register"
    // onSubmit={handleSubmit}
    >
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
          {/* <label>Email: </label> */}
          <input
          type="text"
          id="email"
          onChange={handleEmail}
          //   value="email"
          placeholder='email'
          required
          className='input-field'/>
          <p>must contain @</p>
      </div>
      <div className='input-idv-container'>
          {/* <label>Confirm Email: </label> */}
          <input
          type="text"
          id="confirm-email"
          onChange={handleConfirmationEmail}
          //   value="confirm email"
          placeholder='confirm email'
          required
          className='input-field'/>
          <p>emails do not match</p>
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
          <p>must contain: 7-15 characters, 1 number & 1 symbol </p>
      </div>
      <div className='input-idv-container'>
          {/* <label>Confirm Password: </label> */}
          <input
          type="text"
          id="confirm-password"
          onChange={handleConfirmationPassword}
          //   value="confirm password"
          placeholder='confirm password'
          required
          className='input-field no-match'/>
          <p>emails do not match</p>
      </div>

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

export default RegistrationForm
