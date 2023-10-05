import React from 'react'

import { Footer, AboutCarousel } from '../../components'

import "../../assets/css/about.css";
import logo from '../../assets/images/logo.png'
import krisOptimised from "../../assets/images/krisOptimised.png"
import raviaOptimised from "../../assets/images/raviaOptimised.png"
import camilleOptimised from "../../assets/images/camilleOptimised.png"
import samOptimised from "../../assets/images/samOptimised.png"
import nicOptimised from "../../assets/images/nicOptimised.png"

const About = () => {

  const foundersList = [
    {imgUrl: krisOptimised, altText: "Kristian Spiropali headshot", subText: "Kristian Spiropali"}, 
    {imgUrl: raviaOptimised, altText: "Ravia Saini headshot", subText: "Ravia Saini"}, 
    {imgUrl: camilleOptimised, altText: "Camille Francis headshot", subText: "Camille Francis"}, 
    {imgUrl: samOptimised, altText: "Sam Merrick headshot", subText: "Sam Merrick"}, 
    {imgUrl: nicOptimised, altText: "Nicolas Sanschagrin headshot", subText: "Nicolas Sanschagrin"}
  ]

    return (
    <>
    <h1 className='top-header'>About WellSpace</h1>
    <div className='about-ourmission-container'>
      <div className='about-ourmission-left-col'>
        <h3 className='mission-subhead'>Our Mission</h3>
        <AboutCarousel />
      </div>
      <div className='about-ourmission-right-col' id="about-mission-right-col"><img className='about-logo' src={logo} alt="WellSpace logo" /></div>
    </div>
    <div className='about-demo-container'>
      <div className='about-ourmission-left-col' id='about-demo-left-col'>
        <img className='about-logo' src={logo} alt="WellSpace logo" />
      </div>
        <div className='about-ourmission-right-col' id='about-demo-right-col'>
          <h3 className='mission-subhead'>A WellSpace Demonstration</h3>
          <p className='mission-demo-text'>Take a look at our app demo for a glimpse of our app features demonstrated by a member of the WellSpace team.</p>
          <p className='mission-demo-text'>Be sure to give the WellSpace app a try for yourself. <a href='/login-register'><strong>Simply register to get started</strong></a>.</p>
        </div>
    </div>
    <div className='about-founders-container'>
      <h3 className='mission-subhead'>Meet The Founders</h3>
      <div className='about-founders-center'>
        {foundersList.map((person, index) => {
          return (<div className='founder-container' key={index}>
            <img src={person.imgUrl} alt={person.altText} className='founder-img'/>
            <p className='founder-subtext'>{person.subText}</p>
          </div>)
        })}
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default About
