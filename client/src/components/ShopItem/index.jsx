import React from 'react'

const ShopItem = ({ item }) => {
  return (
    <div className="shop-item">
        <img className="item-image" src={item.image} alt={item.name} />
        <div className="item-price">${item.price}</div>
    </div>
  )
}

export default ShopItem