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
        <p className="profile-title">My Profile</p>
        <ProfileInfo />
        <Stats /> 
        <Buttons />
      </div>
    </ProfileProvider>
  )
}

export default Profile