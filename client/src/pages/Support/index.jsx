import React, { useEffect, useState } from 'react'


import '../../assets/css/support.css'
import { SupportIcons, SupportServicesList } from '../../components'
import talking from "../../assets/images/supportIcons/talking.png"

const Support = () => {
  //this will be a number
  const userMood = ""

  const supportServiceSchema = [
    {
      id: 0,
      type_name: "talking",
      type_id: 1,
      icon_url: talking,
      service_list: [{title: "Talking Service", url: "https://www.google.com/search?q=talk+to+someone"}]
    },
    {
      id: 1,
      type_name: "stress management",
      type_id: 2,
      icon_url: "",
      service_list: [{title: "Stress Management Service", url: "https://www.google.com/search?q=stress+management"}]
    },
    {
      id: 2,
      type_name: "physical wellness",
      type_id: 3,
      icon_url: "",
      service_list: [{title: "Physical Wellness Service", url: "https://www.google.com/search?q=stress+management"}]
    },
    {
      id: 3,
      type_name: "emotional support",
      type_id: 4,
      icon_url: "",
      service_list: [{title: "Physical Wellness Service", url: "https://www.google.com/search?q=stress+management"}]
    }
  ]

  //the first position is dependent on the mood provided by the user or defaults to the first in the index of the support service schema

  const [firstPosition, setFirstPosition] = useState(userMood ? findService(userMood) : supportServiceSchema[0])

  const [supportServices, setSupportServices] = useState(supportServiceSchema)

  function findService(moodNum){
    //returns an array object (must be accessed via index [0])
    return supportServiceSchema.filter((service) => service.type_id == moodNum)
  }
  useEffect(() => {
    
  }, [])
  // console.log(firstPosition)
  return (
    <>
    <SupportIcons firstPosition={firstPosition} supportServices={supportServices} />
    <SupportServicesList supportServices={supportServices} />
    </>
  )
}

export default Support
