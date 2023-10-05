import React, { useEffect, useState } from 'react'
import talking from "../../assets/images/supportIcons/talking.png"

import '../../assets/css/support.css'
import { SupportItem } from '../../components'

import Carousel from 'react-bootstrap/Carousel';

const SupportCarousel = ({currentSelection, supportServiceSchema, supportServices, setIsOpen, isOpen}) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  return (
    <>
    <Carousel activeIndex={currentIndex} onSelect={handleSelect} interval={null} keyboard touch data-bs-theme="dark">
      {supportServiceSchema.map((service, index) => {
        return (
          <Carousel.Item key={index}>
            <SupportItem service={service} currentSelection={currentSelection} setIsOpen={setIsOpen} open={isOpen}/>
            <Carousel.Caption>
              <h3 className='yellow-text'>{service.type_name}</h3>
              <button className='support-carousel-btn' id={`cb${service.type_id}`} onClick={(e) => {
                setIsOpen(true)
                currentSelection(e)}}>Find {service.type_name} Services</button>
            </Carousel.Caption>
                      
          </Carousel.Item>
        )
      })}
    </Carousel>   
    </>
  )
}

export default SupportCarousel
