import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../../assets/css/navbar.css';

const Header = () => {
  return (
    <>
      <header>
        <nav>
          <img src="../../assets/images/logo.jpeg" className="logo" />
          <NavLink to="/" className="nav-link" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/support" className="nav-link">Support</NavLink>
          <NavLink to="/profile" className="nav-link">Profile</NavLink>
          <NavLink to="/shop" className="nav-link">Shop</NavLink>
          <NavLink to="/login" className="nav-link">Login</NavLink>
          <NavLink to="/register" className="nav-link">Register</NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
