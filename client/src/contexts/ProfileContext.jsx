import React, { useState, useContext, createContext } from "react";

const ProfileContext = createContext(); 

export const ProfileProvider = ({ children }) => {

  const [editing, setEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    alias: 'Your Alias',
    image: '/src/assets/images/avatars/panda.png',
    username: 'your username',
    age: 'your age',
    gender: 'your gender',
    quote: 'What motivates you?',
    goals: 'Here list your goals. Can range from short term to long term. Be as specific as you can or as vague as you want. This app is for you so you can use it however you want!'
  });

  const toggleEdit = () => {
    setEditing(prev => !prev);
  }

  const updateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  }

  return (
    <ProfileContext.Provider
      value={{
        editing,
        profile,
        toggleEdit,
        updateProfile
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);