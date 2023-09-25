import React from 'react';
import { NavLink, Outlet } from 'react-router-dom'

const Header = () => {

  const styles = ({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })

  return (
    <>
      <header>
        <nav>
          <NavLink to="/" style={styles}>Home</NavLink>
          <NavLink to="/about" style={styles}>About</NavLink>
          <NavLink to="/support" style={styles}>Support</NavLink>
          <NavLink to="/profile" style={styles}>Profile</NavLink>
          <NavLink to="/shop" style={styles}>Shop</NavLink>
          <NavLink to="/login" style={styles}>Login</NavLink>
          <NavLink to="/register" style={styles}>Register</NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Header;