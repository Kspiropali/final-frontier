import React from 'react'

import '../../assets/css/welcome.css'

const Welcome = () => {
  return (
    <>
    <h1 className='top-header'>Welcome</h1>
    <div className='welcome-quad-row'>
      <div className='welcome-quad-cont' id='welcome-quad-1'>LEARN MORE ABOUT WELLSPACE</div>
      <div className='welcome-quad-cont'id='welcome-quad-2'>LOGIN/REGISTER</div>
      <div className='welcome-quad-cont'id='welcome-quad-3'>GO TO YOUR WELLSPACE</div>
      <div className='welcome-quad-cont'id='welcome-quad-4'>FIND SUPPORT SERVICES</div>
    </div>
    </>
  )
}

export default Welcome
