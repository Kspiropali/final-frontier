import React, { useEffect, useState } from 'react'

import '../../assets/css/about.css'

import Carousel from 'react-bootstrap/Carousel';
const AboutCarousel = ({currentSelection}) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  return (
    <>
    <Carousel activeIndex={currentIndex} onSelect={handleSelect} interval={null} keyboard touch data-bs-theme="dark">
      {/* {supportServiceSchema.map((service, index) => {
        return (
          <Carousel.Item key={index}>
            <SupportItem service={service} currentSelection={currentSelection} setIsOpen={setIsOpen} open={isOpen}/>
            <Carousel.Caption>
              <h3 className='yellow-text'>{service.type_name}</h3>
              <button className='support-carousel-btn'>Find {service.type_name} Services</button>
            </Carousel.Caption>
                      
          </Carousel.Item>
        )
      })} */}
    </Carousel>   
    </>
  )
}

export default AboutCarousel
