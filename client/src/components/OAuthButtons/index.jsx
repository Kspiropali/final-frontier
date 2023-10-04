import React from 'react'
import google from "../../assets/images/oAuthIcons/google.png"
import facebook from "../../assets/images/oAuthIcons/facebook.png"

const OAuthButtons = () => {


  return (
    <>
    <button className='OAuth-btn' id='google-Oauth'>
      <img src={google} alt="" className='OAuth-icon'/><a href="/auth/google/login" target='_blank'>Login with Google</a>
    </button>
    <button className='OAuth-btn' id='google-Oauth'>
      <img src={facebook} alt="" className='OAuth-icon'/><a href="/auth/facebook/login" target='_blank'>Login with Facebook</a></button>
    </>
  )
}

export default OAuthButtons
