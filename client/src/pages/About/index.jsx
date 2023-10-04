import React from 'react'

import { Founders, Footer, AboutCarousel } from '../../components'

import "../../assets/css/about.css";

const About = () => {

  const missionStatement = [
    "Welcome to your new virtual wellness space at WellSpace. Our mission is to build a self-care app that tackles the issue of user drop-off and motivates our users to complete small wellness tasks each day, with the overall message that wellness doesn't have to be large efforts, but instead can be small managable intentions that are fulfilled daily.",

    "Our app achieves this by providing a combination of set wellness tasks and mystery tasks for users to complete each day. As users complete their tasks, they are rewarded in 3 ways:\nA homepage that brightens with each task completed\nCoins that can be redeemed in the WellSpace shop to decorate your avater and WellSpace\nPhysical and mental wellness benefits",

    "The combination of set and mystery tasks was done intentionally, so users can develop their core consistency through their set tasks, but also keep things fresh with mystery tasks that give them the opportunity to try other wellness activities they might not usually gravitate towards.", "We hope for our users to feel a sense of pride and accomplishment everytime they enter their WellSpace and see the new furnishings and personalisations, reflective of their consistent daily wellness habits."
  ]

  return (
    <>
    <h1 className='top-header'>About WellSpace</h1>
    <h3 className='mission-subhead'>Our Mission</h3>
    <AboutCarousel/>
    {missionStatement.map((paragraph, index) => <p key={index} className='about-para'>{paragraph}</p>)}
    <Founders/>
    <Footer/>
    </>
  )
}

export default About
