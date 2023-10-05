import React from 'react'
import mindfullnessOMG from "../../assets/images/supportIcons/mindfullnessOMG.svg"
const SupportServicesList = ({supportServices, serviceChoice}) => {

  return (
    <>
 
      <h3 className=''>{serviceChoice[0] ? `${serviceChoice[0].type_name} services` : "select a service"}</h3>
      <div className='service-options-container'>
        {!serviceChoice[0] ? "" : serviceChoice[0].service_list.map((service, index) => {
          return (
            <div className="service-item" key={index}>
              <div className='service-img-cont'>
                <img className='service-img' src={mindfullnessOMG} alt="" />
              </div>
              <div className='service-text-area'>
                <h4 className='support-service-titles'><a href={service.url} target='_blank' className='a-tag-unset'>{service.title}</a></h4>
                <p className='service-description'>{service.description}</p>
              </div>
              
            </div>
          )
        })} 
      </div>

    </>
  )
}

export default SupportServicesList
