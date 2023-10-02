import React from 'react'

const SupportItem = ({service, currentSelection}) => {

    // gather the data for the support services (json or db)
    // icon link for icon

  return (
    <>
      <div className='support-icon-container' id={`sic-${service.type_id}`} onClick={(e) => currentSelection(e)}>
        <img src={service.icon_url} alt="" className='support-icon' id={`si-${service.type_id}`} onClick={(e) => currentSelection(e)}/>
      </div>
    </>
  )
}

export default SupportItem
