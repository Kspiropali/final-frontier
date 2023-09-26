import React from 'react'

const SupportIcons = () => {


    // gather the data for the support services (json or db)
    // icon link for icon


  return (
    <>
    <div className='all-icons-container'>
      {/* This one will be reserved for the first index OR the service that corresponds most to the user's mood */}
      <div className='support-item-container' >
          <div className='support-tile'>
              <img src="" alt="" />
          </div>
      </div>
      {/* this will be the rest of the icons which will be mapped based on the list of service categories */}
      <div className='support-item-container' >
          <div className='support-tile'>
              <img src="" alt="" />
          </div>
      </div>
    </div>
    </>
  )
}

export default SupportIcons
