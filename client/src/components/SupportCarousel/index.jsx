import React, { useEffect, useState } from 'react'
import talking from "../../assets/images/supportIcons/talking.png"

import '../../assets/css/support.css'

import chevronLeft from "../../assets/images/supportIcons/chevronLeft.svg"
import chevronRight from "../../assets/images/supportIcons/chevronRight.svg"
import { SupportItem } from '../../components'

const SupportCarousel = ({currentSelection, supportServiceSchema, supportServices}) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0){
        newIndex = 0;
    } else if (newIndex >= supportServiceSchema.length){
        newIndex = supportServiceSchema.length -1;
    }

    setCurrentIndex(newIndex);
  }

  const sliderStyles = {
    height: "100%",
    position: "relative"
  }

  const slideStyles = {
    width: '100%',
    height: '100%',
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${supportServiceSchema[currentIndex].icon_url})`
  }

  return (
    <>
    <div style={sliderStyles}>
        <div></div>
        <div style={slideStyles}></div>
    </div>
    

        {/* {supportServices.map((service, index) => {
            return (
                <>
                <div className='support-item-container' >
                <SupportItem service={service} currentSelection={currentSelection} key={index} />
                <h3 className='yellow-text icon-title' key={`$h3{index}`}>{service.type_name}</h3>
                </div>
                </>
            )
        })} */}
   
    </>
  )
}

export default SupportCarousel
