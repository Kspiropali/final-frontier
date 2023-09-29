import React, { useState } from 'react'
import { ToggleShop, ShopItem, FetchAvatar } from '../../components'
import { useShop } from '../../contexts/ShopContext';
import '../../assets/css/shopbox.css'
import testItem from '../../assets/images/testitem/hat.png'
import testItem2 from '../../assets/images/testavatars/default.png'
import testItem3 from '../../assets/images/testbg/rainbow.jpg'
import testCoin from '../../assets/images/testitem/coin.png'

const ShopBox = () => {
    const { setSelectedItem, selectedFilters, searchQuery } = useShop(); 
    const [avatarItems, setAvatarItems] = useState([]);

    const handleAvatarItemsFetched = (items) => {
        setAvatarItems(items);
      };

    const shopItems = [
        {
            id: 1,
            image: testItem,
            name: "Hat",
            type: "accessory",
            description: "A stylish hat for any occasion",
            price: 10,
            coinImage: testCoin
        },
        {
            id: 2,
            image: testItem2,
            name: "Bot",
            type: 'avatar',
            description: "Embrace your inner anonymous facebook user",
            price: 20,
            coinImage: testCoin
        },
        {
            id: 3,
            image: testItem3,
            name: "Rainbow",
            type: 'background',
            description: "Gaze at this beautiful site",
            price: 5,
            coinImage: testCoin
        }
    ]

  let filteredItems = shopItems
  if (Object.values(selectedFilters).some(Boolean)) {
    filteredItems = shopItems.filter((item) => selectedFilters[item.type]);
  }

  const filteredItemsSearch = shopItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const avatarCategoryItems = [
    ...filteredItemsSearch.filter((item) => item.type === 'avatar'),
    ...avatarItems
  ];

  const categorizedItems = {};
    filteredItems.forEach((item) => {
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
          <FetchAvatar onAvatarItemsFetched={handleAvatarItemsFetched} />
    
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
                      {category === 'avatar'
                        ? avatarCategoryItems.map((item) => (
                            <ShopItem
                              key={item.id}
                              item={item}
                              onItemClick={() => handleItemClick(item)}
                            />
                          ))
                        : items.map((item) => (
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