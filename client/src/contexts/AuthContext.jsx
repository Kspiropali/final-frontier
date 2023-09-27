import React, { useState, useContext, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  //relies on cookies
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  //if we implement account confirmation emails
  const [isConfirmed, setIsConfirmed] = useState(false)

  // for login & registration forms
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // for reset password & registration forms
  const [email, setEmail] = useState('')
  
  // ONLY for registration page
  const [confirmationPassword, setConfirmationPassword] = useState('')
  const [confirmationEmail, setConfirmationEmail] = useState('')

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername, password, setPassword, confirmationPassword, setConfirmationPassword, confirmationEmail, setConfirmationEmail, isConfirmed, setIsConfirmed }}>
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
