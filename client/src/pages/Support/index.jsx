import React, { useEffect, useState } from 'react'

import '../../assets/css/support.css'
import { ServicesModal, SupportCarousel, SupportServicesList } from '../../components'
import callOMG from "../../assets/images/supportIcons/callOMG.svg"
import mindfullnessOMG from "../../assets/images/supportIcons/mindfullnessOMG.svg"
import emotionalSupportOMG from "../../assets/images/supportIcons/emotionalSupportOMG.svg"
import exerciseOMG from "../../assets/images/supportIcons/exerciseOMG.svg"
import chillingOMG from "../../assets/images/supportIcons/chillingOMG.svg"

const Support = () => {
  
  const supportServiceSchema = [
    {
    id: 0,
    type_name: "Talking",
    type_id: 1,
    icon_url: callOMG,
    service_list: [{title: "Talking Service", url: "https://www.google.com/search?q=talk+to+someone"}]
    },
    {
    id: 1,
    type_name: "Stress Management",
    type_id: 2,
    icon_url: mindfullnessOMG,
    service_list: [{title: "Stress Management Service", url: "https://www.google.com/search?q=stress+management"}, {title: "Stress Management Service", url: "https://www.google.com/search?q=stress+management"}, {title: "Stress Management Service", url: "https://www.google.com/search?q=stress+management"}]
    },
    {
    id: 2,
    type_name: "Physical Wellness",
    type_id: 3,
    icon_url: exerciseOMG,
    service_list: [{title: "Physical Wellness Service", url: "https://www.google.com/search?q=stress+management"}, {title: "Physical Wellness Service", url: "https://www.google.com/search?q=stress+management"}, {title: "Physical Wellness Service", url: "https://www.google.com/search?q=stress+management"}]
    },
    {
    id: 3,
    type_name: "Emotional Support",
    type_id: 4,
    icon_url: chillingOMG,
    service_list: [{title: "Emotional Support Service", url: "https://www.google.com/search?q=stress+management"}, {title: "Emotional Support Service", url: "https://www.google.com/search?q=stress+management"}]
    }
]

  const [supportServices, setSupportServices] = useState(supportServiceSchema)
  const [serviceChoice, setServiceChoice] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  function findService(moodNum){
    //returns an array object (must be accessed via index [0])
    return supportServiceSchema.filter((service) => service.type_id == moodNum)
  }

  function currentSelection(e){
    const choiceId = e.target.id

    const service = supportServices.filter((supportService) => choiceId.includes(supportService.type_id.toString()))

    setServiceChoice(service)
  }

  return (
    <>
    <h1 className='top-header' >Support</h1>
    {/* <div className='page-description'>
      <h3 className='white-text white-h3'>We're Here to Help</h3>
    </div> */}
    <div className='carousel-comp-container'>
      <SupportCarousel currentSelection={currentSelection} supportServiceSchema={supportServiceSchema} supportServices={supportServices} setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
    <ServicesModal open={isOpen} setIsOpen={setIsOpen}>
      MY MODAL
    </ServicesModal>
    {/* {serviceChoice[0] ? <SupportServicesList supportServices={supportServices} serviceChoice={serviceChoice} /> : ""} */}
    {/* <SupportServicesList supportServices={supportServices} serviceChoice={serviceChoice} /> */}
    </>
  )
}

export default Support
