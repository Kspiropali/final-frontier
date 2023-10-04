import React, { useEffect, useState } from 'react'

import '../../assets/css/about.css'

import Carousel from 'react-bootstrap/Carousel';
const AboutCarousel = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  const missionStatement = [
    ["To Improve Wellness App Engagement and Make Daily Self-Care Achieveable","Welcome to your new virtual wellness space at WellSpace. Our mission is to build a self-care app that tackles the issue of user drop-off and motivates our users to complete small wellness tasks each day, with the overall message that wellness doesn't have to be large efforts, but instead can be small managable intentions that are fulfilled daily."],

    ["Using Gameification and Rewards to Keep Things Interesting","Our app achieves this by providing a combination of set wellness tasks and mystery tasks for users to complete each day. As users complete their tasks, they are rewarded in 3 ways:\nA homepage that brightens with each task completed\nCoins that can be redeemed in the WellSpace shop to decorate your avater and WellSpace\nPhysical and mental wellness benefits"],

    ["Helping Users Achieve The Satisfaction of Consistency AND Self-care Exploration","Our combination of set and mystery tasks was done intentionally, so users can develop their core consistency through their set tasks, but also keep things fresh with mystery tasks that give them the opportunity to try other wellness activities they might not usually gravitate towards.", "We hope for our users to feel a sense of pride and accomplishment everytime they enter their WellSpace and see the new furnishings and personalisations, reflective of their consistent daily wellness habits."]
  ]

  return (
    <>
    <Carousel activeIndex={currentIndex} onSelect={handleSelect} interval={7000} keyboard touch data-bs-theme="dark" className='about-mission-carousel' controls={false} pause='hover'>
      {missionStatement.map((paragraph, index) => {
        return (
          <Carousel.Item key={index}>
            <strong className='mission-carousel-strong-text'>{paragraph[0]}</strong>
            <p className='mission-carousel-text'>{paragraph[1]}</p>           
          </Carousel.Item>
        )
      })}
    </Carousel>   
    </>
  )
}

export default AboutCarousel;
