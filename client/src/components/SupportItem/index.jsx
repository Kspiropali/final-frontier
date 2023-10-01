import React from 'react'

const SupportIcons = ({service, currentSelection}) => {

    // gather the data for the support services (json or db)
    // icon link for icon

  return (
    <>
    <div className='all-icons-container'>
      
      {/* This one will be reserved for the first index OR the service that corresponds most to the user's mood */}
      <div className='support-item-container'>
        <div className='support-icon-container' id={`sic-${service.type_id}`} onClick={(e) => currentSelection(e)}>
          <div className='support-tile'>
              <img src={service.icon_url} alt="" className='support-icon' id={`si-${service.type_id}`} onClick={(e) => currentSelection(e)}/>
          </div>
        </div>
        <h3 className='yellow-text icon-title'>{service.type_name}</h3>
      </div>
      
    </div>
    </>
  )
}

export default SupportIcons
