import React from 'react'

import krisOptimised from "../../assets/images/krisOptimised.png"
import raviaOptimised from "../../assets/images/raviaOptimised.png"
import camilleOptimised from "../../assets/images/camilleOptimised.png"
import samOptimised from "../../assets/images/samOptimised.png"
import nicOptimised from "../../assets/images/nicOptimised.png"

const Founders = () => {
  return (
    <>
    <h2>Our Founders</h2>
    <div className='founders-all-container'>
        <div className='founder-container'>
            <img src={krisOptimised} alt="Kristiam Spiropali headshot" className='founder-img' />
            <p className='founder-subtext white-text'>Kristian Spiropali</p>
        </div>
        <div className='founder-container'>
            <img src={raviaOptimised} alt="Ravia Saini headshot" className='founder-img' />
            <p className='founder-subtext white-text'>Ravia Saini</p>
        </div>
        <div className='founder-container'>
            <img src={camilleOptimised} alt="Camille Francis headshot" className='founder-img' />
            <p className='founder-subtext white-text'>Camille Francis</p>
        </div>
        <div className='founder-container'>
            <img src={samOptimised} alt="Sam Merrick" className='founder-img' />
            <p className='founder-subtext white-text'>Sam Merrick</p>
        </div>
        <div className='founder-container'>
            <img src={nicOptimised} alt="Nicolas Sanschagrin" className='founder-img' />
            <p className='founder-subtext white-text'>Nicolas Sanschagrin</p>
        </div>
    </div>
    </>
  )
}

export default Founders
