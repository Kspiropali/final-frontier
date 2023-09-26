import React, { createContext, useContext, useState } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({ /* User details here */ });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (key) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const contextValue = {
    selectedFilters,
    handleCheckboxChange,
    openModal,
    closeModal,
    isModalOpen,
    userDetails,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);