import React, { useState } from 'react'


import '../../assets/css/support.css'
import { SupportIcons, SupportServicesList } from '../../components'

const Support = () => {


  //use useState to control the selected service
  // const = useState("")

  return (
    <>
    <SupportIcons/>
    <SupportServicesList/>
    </>
  )
}

export default Support
