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
          <NavLink to="/" className="navi-link" activeclassname="active">
            Home
          </NavLink>
          <NavLink to="/about" className="navi-link">About</NavLink>
          <NavLink to="/support" className="navi-link">Support</NavLink>
          <NavLink to="/profile" className="navi-link">Profile</NavLink>
          <NavLink to="/shop" className="navi-link">Shop</NavLink>
          <NavLink to="/login-register" className="navi-link">Login/Register</NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
