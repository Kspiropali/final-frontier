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
