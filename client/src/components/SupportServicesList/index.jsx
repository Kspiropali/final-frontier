import React from 'react'

const SupportServicesList = ({supportServices, serviceChoice}) => {

  return (
    <>
    <div className='center-cont'>
      <h3 className='icon-title yellow-text'>{serviceChoice[0] ? `${serviceChoice[0].type_name} services` : "select a service"}</h3>
      <div className='service-options-container'>
        {!serviceChoice[0] ? "" : serviceChoice[0].service_list.map((service, index) => {
          return (
            <div className="service-item" key={index}>
              <div className='service-img'>
                <img src="" alt="" />
              </div>
              <div className='service-text-area'>
                <p className='white-text'><a href={service.url} target='_blank'>{service.title}</a></p>
              </div>
            </div>
          )
        })} 
      </div>
    </div>
    </>
  )
}

export default SupportServicesList
