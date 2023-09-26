import React, { useState, useContext, createContext } from "react";

const ProfileContext = createContext(); 

export const ProfileProvider = ({ children }) => {

  const [editing, setEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    alias: '',
    image: '',
    age: '',
    gender: '',
    quote: '',
    goals: ''
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