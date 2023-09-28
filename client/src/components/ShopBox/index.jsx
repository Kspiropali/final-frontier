import React from 'react'
import { ToggleShop, ShopItem } from '../../components'
import { useShop } from '../../contexts/ShopContext';

import '../../assets/css/shopbox.css'

import testItem from '../../assets/images/testitem/hat.png'
import testItem2 from '../../assets/images/testavatars/default.png'
import testCoin from '../../assets/images/testitem/coin.png'

const ShopBox = () => {
    const { selectedItem, setSelectedItem } = useShop(); 

    const shopItems = [
        {
            id: 1,
            image: testItem,
            name: "Hat",
            type: "Accessory",
            description: "A stylish hat for any occasion",
            price: 10,
            coinImage: testCoin
        },
        {
            id: 2,
            image: testItem2,
            name: "Bot",
            type: 'Avatar',
            description: "Embrace your inner anonymous facebook user",
            price: 20,
            coinImage: testCoin
        },
    ]

  const categorizedItems = {}; // Create an object to store categorized items

    shopItems.forEach((item) => {
        // Group items by their type
        if (!categorizedItems[item.type]) {
            categorizedItems[item.type] = [];
        }
        categorizedItems[item.type].push(item);
    });

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

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
                    {Object.entries(categorizedItems).map(([category, items]) => (
                        <div key={category}>
                            <h2 className="catergory-header">{category}</h2>
                            <div className="item-row">
                                {items.map((item) => (
                                    <ShopItem
                                        key={item.id}
                                        item={item}
                                        onItemClick={() => handleItemClick(item)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ShopBox;