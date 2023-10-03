import React, { useState } from 'react'
import axios from 'axios';
import '../../assets/css/prevbox.css'
import { useShop } from '../../contexts/ShopContext'
import { ConfirmationModal } from '../../components/';
import itemCoin from '../../assets/images/testitem/coin.png'

const ShopPreview = () => {
    const { selectedItem } = useShop()
    const userCoins = 721; // Replace with the user's actual coin balance

    const [isBuyConfirmationVisible, setBuyConfirmationVisible] = useState(false);
    const [purchaseItem, setPurchaseItem] = useState(null);

    const [userInventory, setUserInventory] = useState([]); // Initialize as an empty array


    const showBuyConfirmation = () => {
        setPurchaseItem(selectedItem);
        setBuyConfirmationVisible(true);
    };

    const hideBuyConfirmation = () => {
        setBuyConfirmationVisible(false);
    };

    const handleBuyClick = () => {
        if (selectedItem && userCoins >= selectedItem.price) {
            showBuyConfirmation();
        } else {
            alert('You do not have enough coins to make this purchase.');
        }
    };

    const confirmPurchase = async () => {
        try {
          // Check if the purchaseItem is not null
          if (purchaseItem) {
            // Send a POST request to the inventory endpoint to add the item to the user's inventory
            const response = await axios.post('http://127.0.0.1:3000/inventory', purchaseItem);
    
            if (response.status === 201) {
              // Deduct the item's price from the user's coins
              const updatedUserCoins = userCoins - selectedItem.price;
    
              // Close the confirmation modal
              hideBuyConfirmation();
    
              // Update the user's coin balance (you may need an API call to update the balance)
              // For now, just log the update
              console.log(`Updated user coin balance: ${updatedUserCoins}`);
    
              // Log the purchase
              console.log(`Purchased ${selectedItem.name}`);
    
              // Add the purchased item to the user's inventory in the state
              setUserInventory([...userInventory, purchaseItem]);
            } else {
              console.error('Failed to add item to inventory.');
            }
          }
        } catch (error) {
          console.error(error);
        }
      };

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
                <button className="buy-btn" onClick={handleBuyClick}>Buy</button>
            </div>
          </>
        )}
          {/* Render the ConfirmationModal component */}
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


export default ShopPreview