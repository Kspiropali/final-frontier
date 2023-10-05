import React, { useEffect, useState } from 'react'

import '../../assets/css/welcome.css'
import { useNavigate } from 'react-router'
import padlock from "../../assets/images/welcome/lockedPadlock.png"
import { useAuth } from '../../contexts/AuthContext'

const Welcome = () => {
  const [quadPanel, setQuadPanel] = useState("")
  const navigate = useNavigate()

  const { isLoggedIn, setIsLoggedIn } = useAuth()

  async function checkAuth(){
    try {
      const response = await fetch("/users/ping", {method: "POST"})
      if(response.status == 200) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    } catch (error) {
      setIsLoggedIn(false)
      console.log(error)
    }
      
  }

  useEffect(() => {
      checkAuth()
  }, [])

  return (
    <div className='welcome-ova-div'>
    <h1 className='top-header' id='welcome-header'>Welcome To WellSpace</h1>
    <div className='welcome-quad-row'>

      <button className='welcome-quad-cont' id='welcome-quad-1' onClick={() => quadPanel == "about" ? setQuadPanel("") : setQuadPanel("about")}>
        <h2 className='welcome-h2'>LEARN MORE ABOUT WELLSPACE</h2>
        {quadPanel == "about" ? <button className='welcome-qp-btn' onClick={() => navigate("/about")}>Go To About Page</button> : null}
      </button>

      <button className='welcome-quad-cont'id='welcome-quad-2' onClick={() => quadPanel == "register" ? setQuadPanel("") : setQuadPanel("register")}>
        <h2 className='welcome-h2'>LOGIN OR REGISTER</h2>
        {quadPanel == "register" ? <button className='welcome-qp-btn' onClick={() => navigate("/login-register")}>Go To Login Page</button> : null}
      </button>

      {!isLoggedIn ? <div className='welcome-quad-cont'id='welcome-quad-3'>
        <h2 className='welcome-h2'>GO TO YOUR WELLSPACE</h2>
        <img className="welcome-padlock" src={padlock} alt="padlock image" />
      </div> : <button className='welcome-quad-cont'id='welcome-quad-3' onClick={() => quadPanel == "home" ? setQuadPanel("") : setQuadPanel("home")}>
        <h2 className='welcome-h2'>GO TO YOUR WELLSPACE</h2>
        {quadPanel == "home" ? <button className='welcome-qp-btn' onClick={() => navigate("/")}>Go To Your WellSpace</button> : null}
      </button>}
      
      <button className='welcome-quad-cont'id='welcome-quad-4' onClick={() => quadPanel == "support" ? setQuadPanel("") : setQuadPanel("support")}>
        <h2 className='welcome-h2'>FIND SUPPORT SERVICES</h2>
        {quadPanel == "support" ? <button className='welcome-qp-btn' onClick={() => navigate("/support")}>Go To Support Page</button> : null}
      </button>
    </div>
    </div>
  )
}

export default Welcome
