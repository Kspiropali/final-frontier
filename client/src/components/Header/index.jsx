import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../../assets/css/navbar.css';
import logo from '../../assets/images/logo.png'

const Header = () => {
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
          <NavLink to="/login-register" className="nav-link">Login/Register</NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
