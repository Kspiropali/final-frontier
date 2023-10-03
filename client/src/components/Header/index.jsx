import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../../assets/css/navbar.css';
import logo from '../../assets/images/logo.png'
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {

  const {isLoggedIn, setIsLoggedIn} = useAuth()

  const handleLogout = async () => {
    try {
      const response = await fetch("/users/logout", {"method": "POST"})

      if(response.status == 200){
        console.log(response)

        window.location.reload()
      }
      else {
        console.log("header: user not logged in")
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
          <NavLink to="/" className="nav-link" activeclassname="active">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/support" className="nav-link">Support</NavLink>
          <NavLink to="/profile" className="nav-link">Profile</NavLink>
          <NavLink to="/shop" className="nav-link">Shop</NavLink>
          {isLoggedIn ? <p className='nav-link has-pointer' onClick={() => handleLogout()}>Logout</p>: <NavLink to="/login-register" className="nav-link">Login/Register</NavLink>}
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
