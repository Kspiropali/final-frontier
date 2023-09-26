import React, { useState, useContext, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.token ? true : false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername, password, setPassword }}>
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
