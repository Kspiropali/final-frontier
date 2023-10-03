import React from 'react'
import axios from 'axios';
import itemCoin from '../../assets/images/testitem/coin.png'

const ShopItem = ({ item, onItemClick }) => {
    const handleItemClick = async () => {

        // Fetch item details by ID
        try {
            const response = await axios.get(`http://localhost:3000/items/${item.id}`);
            if (!response.data) {
                throw new Error(`Failed to fetch item details for ID ${item.id}`);
            }
            const data = response.data
            onItemClick(data.item);
        } catch (error) {
            console.error(error);
        }
    };
    
 return (
    <div className="shop-item" onClick={handleItemClick}>
        <img className="item-image" src={item.image} alt={item.name} />
        <div className="item-price">
            <div className="price-container">
                <img src={itemCoin} alt="Coin" className="coin-image" />
                {item.price}
            </div>
        </div>
    </div>
  )
}

export default ShopItem