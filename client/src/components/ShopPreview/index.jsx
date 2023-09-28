import React from 'react'
import '../../assets/css/prevbox.css'
import { useShop } from '../../contexts/ShopContext'

const ShopPreview = () => {
    const { selectedItem } = useShop()
    console.log(selectedItem)

    const handleBuyClick = () => {
        alert(`You are buying ${selectedItem.name}`);
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
            <h3>{selectedItem.description}</h3>
            <div className="price-preview">
              <img 
                src={selectedItem.coinImage} 
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
      </div>
    </>
  )
}

export default ShopPreview