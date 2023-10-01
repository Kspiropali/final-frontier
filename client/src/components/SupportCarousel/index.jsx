import React, { useEffect, useState } from 'react'
import talking from "../../assets/images/supportIcons/talking.png"

import '../../assets/css/support.css'

import callOMG from "../../assets/images/supportIcons/callOMG.svg"
import mindfullnessOMG from "../../assets/images/supportIcons/mindfullnessOMG.svg"
import emotionalSupportOMG from "../../assets/images/supportIcons/emotionalSupportOMG.svg"
import exerciseOMG from "../../assets/images/supportIcons/exerciseOMG.svg"
import chillingOMG from "../../assets/images/supportIcons/chillingOMG.svg"
import { SupportIcons, SupportServicesList, SupportItem } from '../../components'

const SupportCarousel = () => {

    const userMood = ""
    const supportServiceSchema = [
        {
        id: 0,
        type_name: "talking",
        type_id: 1,
        icon_url: callOMG,
        service_list: [{title: "Talking Service", url: "https://www.google.com/search?q=talk+to+someone"}]
        },
        {
        id: 1,
        type_name: "stress management",
        type_id: 2,
        icon_url: mindfullnessOMG,
        service_list: [{title: "Stress Management Service", url: "https://www.google.com/search?q=stress+management"}, {title: "Stress Management Service", url: "https://www.google.com/search?q=stress+management"}, {title: "Stress Management Service", url: "https://www.google.com/search?q=stress+management"}]
        },
        {
        id: 2,
        type_name: "physical wellness",
        type_id: 3,
        icon_url: exerciseOMG,
        service_list: [{title: "Physical Wellness Service", url: "https://www.google.com/search?q=stress+management"}, {title: "Physical Wellness Service", url: "https://www.google.com/search?q=stress+management"}, {title: "Physical Wellness Service", url: "https://www.google.com/search?q=stress+management"}]
        },
        {
        id: 3,
        type_name: "emotional support",
        type_id: 4,
        icon_url: chillingOMG,
        service_list: [{title: "Emotional Support Service", url: "https://www.google.com/search?q=stress+management"}, {title: "Emotional Support Service", url: "https://www.google.com/search?q=stress+management"}]
        }
    ]

  //the first position is dependent on the mood provided by the user or defaults to the first in the index of the support service schema

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
  return (
    <>
    <SupportItem service={firstPosition} currentSelection={currentSelection}/>
    {supportServices.map((service, index) => {
        if (service.id == firstPosition.id)
            return
        return (
            <SupportItem service={service} currentSelection={currentSelection}/>
        )
    })}
    {/* <SupportItem firstPosition={firstPosition} supportServices={supportServices} currentSelection={currentSelection}/> */}
    </>
  )
}

export default SupportCarousel
