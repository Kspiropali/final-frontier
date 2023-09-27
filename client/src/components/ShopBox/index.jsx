import React from 'react'
import { ToggleShop, ShopItem } from '../../components'
import '../../assets/css/shopbox.css'

const ShopBox = () => {

    const shopItems = [
        {
            id: 1,
            image: 'default.png',
            price: 20
        },
        {
            id: 2,
            image: 'avi.png',
            price: 10
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