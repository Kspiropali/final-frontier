import React from 'react'
import "../../assets/css/profile.css";
import ProfileInfo from '../../components/ProfileInfo'
import Stats from '../../components/Stats'
import Buttons from '../../components/Buttons'
import { ProfileProvider } from '../../contexts/ProfileContext';

const Profile = () => {
  return (
    <ProfileProvider>
      <div className="indexP">
        <h1 className="top-header">My Profile</h1>
        <ProfileInfo />
        <Stats /> 
        <Buttons />
      </div>
    </ProfileProvider>
  )
}

export default Profile