import React from 'react'

const ServicesModal = ({ setIsOpen, open, children }) => {
    if(!open) return null
  return (
    <>
    <div className='support-overlay-styles' onClick={() => setIsOpen(!open)}/>
    <div className='support-modal-styles'>
        {children}
    </div>
    </>
  )
}

export default ServicesModal
