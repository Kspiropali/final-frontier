import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/prevbox.css';
import { useShop } from '../../contexts/ShopContext';
import { ConfirmationModal } from '../../components/';
import itemCoin from '../../assets/images/testitem/coin.png';

const ShopPreview = () => {
  const { selectedItem, userCoinBalance, setUserCoinBalance } = useShop();

  const [isBuyConfirmationVisible, setBuyConfirmationVisible] = useState(false);
  const [purchaseItem, setPurchaseItem] = useState(null);
  const [userInventory, setUserInventory] = useState([]);
  const [purchasedItemIds, setPurchasedItemIds] = useState(
    JSON.parse(localStorage.getItem('purchasedItemIds')) || []
  );

  useEffect(() => {
    async function fetchUserInventory() {
      try {
        const response = await axios.get('/users/items');
        if (Array.isArray(response.data)) {
          const purchasedItems = response.data.map((item) => item.id);
          setPurchasedItemIds(purchasedItems);
          localStorage.setItem('purchasedItemIds', JSON.stringify(purchasedItems));
        }
      } catch (error) {
        console.error('Error fetching user inventory:', error);
      }
    }

    fetchUserInventory();
  }, []);

  const showBuyConfirmation = () => {
    setPurchaseItem(selectedItem);
    setBuyConfirmationVisible(true);
  };

  const hideBuyConfirmation = () => {
    setBuyConfirmationVisible(false);
  };

  const handleBuyClick = () => {
    if (selectedItem && userCoinBalance >= selectedItem.price) {
      showBuyConfirmation();
    } else {
      alert('You do not have enough coins to make this purchase.');
    }
  };

  const confirmPurchase = async () => {
    try {
      if (purchaseItem) {
        const response = await axios.post(`/items/buy/${purchaseItem.id}`);

        if (response.data.success) {
          // Deduct the item's price from the user's coins
          const updatedUserCoins = userCoinBalance - purchaseItem.price;

          // Update the user's coin balance from the context
          setUserCoinBalance(updatedUserCoins);

          // Close the confirmation modal
          hideBuyConfirmation();

          // Log the purchase
          console.log(`Purchased ${purchaseItem.name}`);

          // Add the purchased item to the user's inventory in the state
          setUserInventory([...userInventory, purchaseItem]);

          // Add the purchased item's ID to the purchasedItemIds state
          setPurchasedItemIds([...purchasedItemIds, purchaseItem.id]);
          localStorage.setItem('purchasedItemIds', JSON.stringify([...purchasedItemIds, purchaseItem.id])); // Store in localStorage
        } else {
          console.error('Failed to purchase item.');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Check if the selected item is already purchased
  const isItemPurchased = selectedItem && purchasedItemIds.includes(selectedItem.id);

  return (
    <>
      <div className="prevbox-container">
        <h1 className="preview-header">Preview</h1>
      </div>
      <div className="prev-box">
        {selectedItem && (
          <>
            <div className="item-preview-container">
              <img src={selectedItem.image} alt={selectedItem.name} />
            </div>
            <div className="item-details-container">
              <h2>{selectedItem.name}</h2>
              <h3>{selectedItem.type}</h3>
              <h3 className="item-description">{selectedItem.description}</h3>
              <div className="price-preview">
                <img
                  src={itemCoin}
                  alt="Coin"
                  className="coin-image"
                />
                <p>{selectedItem.price}</p>
              </div>
            </div>
            <div className="buy-button-container">
              {isItemPurchased ? (
                <p className="already-purchased">Purchased</p>
              ) : (
                <button
                  className="buy-btn"
                  onClick={handleBuyClick}
                >
                  Buy
                </button>
              )}
            </div>
          </>
        )}
        <ConfirmationModal
          isVisible={isBuyConfirmationVisible}
          item={purchaseItem}
          onConfirm={confirmPurchase}
          onCancel={hideBuyConfirmation}
        />
      </div>
    </>
  );
};

export default ShopPreview;