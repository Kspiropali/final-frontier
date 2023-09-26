import React from 'react'
import "../../assets/css/profile.css";
import ProfileInfo from '../../components/ProfileInfo'
import Stats from '../../components/Stats'
import Buttons from '../../components/Buttons'

const Profile = () => {
  return (
		<div className="index">
    <ProfileInfo />
    <Stats /> 
    <Buttons />
  </div>
  )
}

export default Profile

// const user = { 
//   alias: 'Gojo Satoru',
//   img: "https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/65118b4400e335da865f91ca/img/ellipse-2@2x.png",
//   age: 28,
//   gender: 'male',
//   quote: 'I am the strongest',
//   goals: 'Protect the world from the Cursed Spirits that plague it' 
// }