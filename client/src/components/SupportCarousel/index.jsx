import React, { useEffect, useState } from 'react'
import talking from "../../assets/images/supportIcons/talking.png"

import '../../assets/css/support.css'

import callOMG from "../../assets/images/supportIcons/callOMG.svg"
import mindfullnessOMG from "../../assets/images/supportIcons/mindfullnessOMG.svg"
import emotionalSupportOMG from "../../assets/images/supportIcons/emotionalSupportOMG.svg"
import exerciseOMG from "../../assets/images/supportIcons/exerciseOMG.svg"
import chillingOMG from "../../assets/images/supportIcons/chillingOMG.svg"
import chevronLeft from "../../assets/images/supportIcons/chevronLeft.svg"
import chevronRight from "../../assets/images/supportIcons/chevronRight.svg"
import { SupportIcons, SupportServicesList, SupportItem } from '../../components'

const SupportCarousel = () => {

    

    const userMood = ""
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

  //the first position is dependent on the mood provided by the user or defaults to the first in the index of the support service schema
  
  const [activeIndex, setActiveIndex] = useState(0);

  const [firstPosition, setFirstPosition] = useState(userMood ? findService(userMood) : supportServiceSchema[0])

  const [supportServices, setSupportServices] = useState(supportServiceSchema)
  const [serviceChoice, setServiceChoice] = useState({})

  function findService(moodNum){
    //returns an array object (must be accessed via index [0])
    return supportServiceSchema.filter((service) => service.type_id == moodNum)
  }

  function currentSelection(e){
    const choiceId = e.target.id

    const service = supportServices.filter((supportService) => choiceId.includes(supportService.type_id.toString()))

    setServiceChoice(service)
  }

  const updateIndex = (newIndex) => {
    if (newIndex < 0){
        newIndex = 0
    } else if (newIndex >= supportServiceSchema.length){
        newIndex = supportServiceSchema.length -1;
    }

    setActiveIndex(newIndex);
  }

  return (
    <>  
    <div className='all-icons-container' 
    // style={{transform: `translate(-${activeIndex * 100}%)`}}
    >
        <div className='inner'>
            {supportServices.map((service, index) => {
                return (
                    <>
                    <div className='support-item-container'
                    style={{transform: `translate(-${(activeIndex + 1) * 100}%)`}}
                    >
                    <SupportItem service={service} currentSelection={currentSelection} key={index} />
                    <h3 className='yellow-text icon-title'>{service.type_name}</h3>
                    </div>
                    </>
                )
            })}
        </div>
        
    </div>
    <div className='carousel-buttons'>
        <button className='button-arrow'><img src={chevronLeft} alt="" /></button>
        <div className='indicators'>...</div>
        <button className='button-arrow'><img src={chevronRight} alt="" /></button>
    </div>
    </>
  )
}

export default SupportCarousel
