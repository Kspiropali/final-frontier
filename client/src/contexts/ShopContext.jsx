import React, { createContext, useContext, useState } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [showAllItems, setShowAllItems] = useState(false);
  const [showFeaturedItems, setShowFeaturedItems] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [userCoinBalance, setUserCoinBalance] = useState(0);
  const [avatarImage, setAvatarImage] = useState(null);
  const [isBuyConfirmationVisible, setBuyConfirmationVisible] = useState(false);
  const [purchaseItem, setPurchaseItem] = useState(null);
  const [userInventory, setUserInventory] = useState([]);
  const [purchasedItemIds, setPurchasedItemIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredItems, setFeaturedItems] = useState([]);


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
    setItems,
    userCoinBalance,
    setUserCoinBalance,
    avatarImage,
    setAvatarImage,
    isBuyConfirmationVisible,
    setBuyConfirmationVisible,
    purchaseItem,
    setPurchaseItem,
    userInventory,
    setUserInventory,
    purchasedItemIds,
    setPurchasedItemIds,
    isLoading,
    setIsLoading,
    featuredItems,
    setFeaturedItems
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);