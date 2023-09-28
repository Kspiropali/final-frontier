import React from 'react'
import google from "../../assets/images/oAuthIcons/google.png"
import facebook from "../../assets/images/oAuthIcons/facebook.png"

const OAuthButtons = () => {
  return (
    <>
    <button className='OAuth-btn' id='google-Oauth'>
      <img src={google} alt="" className='OAuth-icon'/>Login with Google
    </button>
    <button className='OAuth-btn' id='google-Oauth'>
      <img src={facebook} alt="" className='OAuth-icon'/>Login with Facebook
    </button>
    </>
  )
}

export default OAuthButtons
