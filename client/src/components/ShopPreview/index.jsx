import React, { useState } from 'react'
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

    const confirmPurchase = () => {
        // Deduct the item's price from the user's coins
        const updatedUserCoins = userCoins - selectedItem.price;

        // Add the purchased item to the user's inventory
        const updatedInventory = [...userInventory, selectedItem];
        setUserInventory(updatedInventory);

        // Close the confirmation modal
        hideBuyConfirmation();

        // Update the user's coin balance
        // Directly update the userCoins state variable
        // This assumes that you have access to userCoins as a state variable
        // If userCoins is not a state variable, you should manage it as a state variable
        // or use a global state management solution like Redux
        // userCoins = updatedUserCoins;

        // Update the user's coin balance
        // setUserCoins(updatedUserCoins); // Uncomment when you have the actual endpoint

        // Log the purchase
        console.log(`Purchased ${selectedItem.name}`);
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