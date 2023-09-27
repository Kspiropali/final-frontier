import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import '../../assets/css/footer.css'

const Footer = () => {
  return (
    <footer>
        <div className='header-row'>
            <div className='header-col'>
                <p className='yellow-text footer-app-name'>WellSpace</p>
                <p className='yellow-text footer-text'>Daily habits to brighten up your day</p>
            </div>
            <div className='header-col'>
                <p className='yellow-text footer-text-bold'>Report a Bug</p>
                <p className='yellow-text footer-text'>wellspace@reportbug@gmail.com</p>
            </div>
            <div className='header-col'>
                <p className='yellow-text footer-text-bold'>Leave a Review</p>
            </div>
        </div>
        <div className="header-row">
            <p className='yellow-text footer-subtext'>© 2023 WellSpace</p>
        </div>
    </footer>
  )
}

export default Footer
