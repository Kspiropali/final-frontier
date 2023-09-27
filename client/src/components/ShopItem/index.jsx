import React from 'react'

const ShopItem = ({ item }) => {
  return (
    <div className="shop-item">
        <img className="item-image" src={item.image} alt={item.name} />
        <div className="item-price">
            <div className="price-container">
                <img src={item.coinImage} alt="Coin" className="coin-image" />
                {item.price}
            </div>
        </div>
    </div>
  )
}

export default ShopItem