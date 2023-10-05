import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../../assets/css/navbar.css';
import logo from '../../assets/images/logo.png'
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {

  const {isLoggedIn, setIsLoggedIn} = useAuth()

  const handleLogout = async () => {
    console.log("entered logout")
    try {
      console.log("entered try")
      const response = await fetch("/users/logout", {"method": "POST"})

      if(response.status == 200){
        console.log(response)

        window.location.reload()
      }
      else {
        console.log("logout function: not 200")
        console.log("received", response.status)
      }
    } catch (err) {
      console.log("Error",err)
    }
  }

  async function checkAuth(){
    const response = await fetch("/users/ping", {method: "POST"})
    if(response.status == 200) {
      console.log("sucess")
      setIsLoggedIn(true)
    } else {
      console.log(response.status)
      setIsLoggedIn(false)
    }
  }

  useEffect(()=> {
    checkAuth()
  }, [])

  return (
    <>
      <header>
      <img src={logo} className="logo" />
        <nav>
          <NavLink to="/" className="navi-link" activeclassname="active">
            Home
          </NavLink>
          <NavLink to="/about" className="navi-link">About</NavLink>
          <NavLink to="/support" className="navi-link">Support</NavLink>
          <NavLink to="/profile" className="navi-link">Profile</NavLink>
          <NavLink to="/shop" className="navi-link">Shop</NavLink>
          {isLoggedIn ? <p className='navi-link has-pointer' onClick={() => handleLogout()}>Logout</p>: <NavLink to="/login-register" className="navi-link">Login/Register</NavLink>}
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
