import React, { useEffect, useState } from 'react'
import talking from "../../assets/images/supportIcons/talking.png"

import '../../assets/css/support.css'

import chevronLeft from "../../assets/images/supportIcons/chevronLeft.svg"
import chevronRight from "../../assets/images/supportIcons/chevronRight.svg"
import { SupportItem } from '../../components'

import Carousel from 'react-bootstrap/Carousel';
const SupportCarousel = ({currentSelection, supportServiceSchema, supportServices}) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  // const updateIndex = (newIndex) => {
  //   if (newIndex < 0){
  //       newIndex = 0;
  //   } else if (newIndex >= supportServiceSchema.length){
  //       newIndex = supportServiceSchema.length -1;
  //   }

  //   setCurrentIndex(newIndex);
  // }

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  return (
    <>
    <Carousel activeIndex={currentIndex} onSelect={handleSelect} interval={null} keyboard touch>
      {supportServiceSchema.map((service, index) => {
        return (
          <Carousel.Item key={index}>
            <SupportItem service={service} currentSelection={currentSelection} />
            <Carousel.Caption>
              <h3 className='yellow-text'>{service.type_name}</h3>
              {/* <button className=''>ffff</button> */}
            </Carousel.Caption>
          </Carousel.Item>
        )
        
      })}
      
    </Carousel>   
    </>
  )
}

export default SupportCarousel
