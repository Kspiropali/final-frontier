import React, { createContext, useContext, useState } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({ /* User details here */ });
  const [showAllItems, setShowAllItems] = useState(false);
  const [showFeaturedItems, setShowFeaturedItems] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCheckboxChange = (key) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const toggleShowAllItems = () => {
    setShowAllItems(!showAllItems);
    setShowFeaturedItems(false);
  };

  const toggleShowFeaturedItems = () => {
    setShowFeaturedItems(!showFeaturedItems);
    setShowAllItems(false);
  };

  const contextValue = {
    selectedFilters,
    handleCheckboxChange,
    openModal,
    userDetails,
    showAllItems,
    toggleShowAllItems,
    showFeaturedItems,
    toggleShowFeaturedItems,
    selectedItem,
    setSelectedItem,
    searchQuery,
    setSearchQuery,
    items,
    setItems
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);