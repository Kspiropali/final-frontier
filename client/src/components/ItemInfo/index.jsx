import React from 'react'

const ItemInfo = ({ item }) => {
  return (
    <div className="item-info">
        <img src={item.image} alt={item.name} />
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <p>{item.price}</p>
        <button onClick={() => handleBuy(item)}>Buy</button>
    </div>
  )
}

export default ItemInfo