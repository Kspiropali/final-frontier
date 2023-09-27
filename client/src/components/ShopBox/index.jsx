import React from 'react'
import { ToggleShop, ShopItem } from '../../components'
import '../../assets/css/shopbox.css'

import testItem from '../../assets/images/testitem/hat.png'
import testCoin from '../../assets/images/testitem/coin.png'

const ShopBox = () => {

    const shopItems = [
        {
            id: 1,
            image: testItem,
            price: 10,
            coinImage: testCoin
        }
    ]

  return (
    <>
    <div className="shop-box-container">
     <h1 className="shop-header">Item Shop</h1>
     <div className="toggle-buttons-container">
        <ToggleShop />
     </div>
     </div>
    <div className="box">
        <div className="shop-items-container">
            {shopItems.map((item) => (
                <ShopItem key={item.id} item={item} />
                ))}
        </div>
    </div>
    </>
  )
}

export default ShopBox