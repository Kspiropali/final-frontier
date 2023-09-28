import React from 'react'
import { ToggleShop, ShopItem } from '../../components'
import { useShop } from '../../contexts/ShopContext';

import '../../assets/css/shopbox.css'

import testItem from '../../assets/images/testitem/hat.png'
import testCoin from '../../assets/images/testitem/coin.png'

const ShopBox = () => {
    const { selectedItem, setSelectedItem } = useShop(); 

    const shopItems = [
        {
            id: 1,
            image: testItem,
            name: "Hat",
            description: "A stylish hat for any occasion",
            price: 10,
            coinImage: testCoin
        }
    ]

    const handleItemClick = (item) => {
        console.log("I have been clicked")
        setSelectedItem(item)
    }

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
                <ShopItem 
                key={item.id} 
                item={item}
                onItemClick={() => handleItemClick(item)}
              />
            ))}
        </div>
     </div>
    </>
  )
}

export default ShopBox