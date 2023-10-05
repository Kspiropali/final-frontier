import React, { useEffect, useState } from 'react'

import '../../assets/css/about.css'

import Carousel from 'react-bootstrap/Carousel';
const AboutCarousel = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  const missionStatement = [
    ["To Improve Wellness App Engagement and Make Daily Self-Care Achieveable."," Our mission is to build a self-care app that tackles the issue of user drop-off and motivates our users to complete small and manageable wellness tasks each day"],

    ["Using Gameification and Rewards to Keep Things Interesting.","As users complete their tasks, they are rewarded in 3 ways:\nA homepage that brightens with each task completed\n, coins that can be redeemed in the WellSpace shop to decorate your WellSpace\n & physical and mental wellness benefits."],

    ["Helping Users Achieve The Satisfaction of Consistency AND Self-care Exploration.","Our combination of recurring and mystery tasks was done intentionally to promote consistency through their recurring set tasks, but also keep things fresh with mystery tasks that give them the opportunity to try other wellness activities they might not usually gravitate towards."]
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
