import React, { createContext, useContext, useState } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleCheckboxChange = (key) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const contextValue = {
    selectedFilters,
    handleCheckboxChange,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);