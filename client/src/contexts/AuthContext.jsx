import React, { useState, useContext, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  //relies on cookies
  async function checkIsLoggedIn(){
    try {
      const response = await fetch("/users/ping", {method: "POST"})
      console.log("AuthProvider - IsLoggedIn", response.status)
      return response.ok
    } catch (err) {
      console.log("AuthProvider - IsLoggedIn", err.status)
      return response.ok
    }
  }
  const [isLoggedIn, setIsLoggedIn] = useState(checkIsLoggedIn() == true ? true : false)

  //if we implement account confirmation emails
  const [isConfirmed, setIsConfirmed] = useState(false)

  // for all forms
  const [displayMessage, setDisplayMessage] = useState('')

  // for login & registration forms
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // for reset password & registration forms
  const [email, setEmail] = useState('')

  // ONLY for registration page
  const [confirmationPassword, setConfirmationPassword] = useState('')
  const [confirmationEmail, setConfirmationEmail] = useState('')

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername, password, setPassword, confirmationPassword, setConfirmationPassword, email, setEmail, confirmationEmail, setConfirmationEmail, isConfirmed, setIsConfirmed, displayMessage, setDisplayMessage }}>
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
