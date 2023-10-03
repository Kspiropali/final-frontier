import React from 'react';
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
      }
    } catch (err) {
      console.log("Error",err)
    }
  }

  console.log("header isLoggedIn",isLoggedIn)

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
          {isLoggedIn ? <><p className='nav-link'>Logout</p></>: <NavLink to="/login-register" className="nav-link">Login/Register</NavLink>}
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
