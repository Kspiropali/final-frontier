import React, { useState, useEffect } from 'react'
import { ToggleShop, ShopItem, FetchAvatar } from '../../components'
import { useShop } from '../../contexts/ShopContext';
import '../../assets/css/shopbox.css'

const ShopBox = () => {
    const { setSelectedItem, selectedFilters, searchQuery } = useShop(); 
    const [avatarItems, setAvatarItems] = useState([]);
    const [shopItems, setShopItems] = useState([]);

    const handleAvatarItemsFetched = (items) => {
        setAvatarItems(items);
      };

    useEffect(() => {
    // Fetch items from your endpoint
    fetch('http://localhost:3000/items')
        .then((response) => response.json())
        .then((data) => {
        // Assuming your API returns an array of items
        console.log(data)
        setShopItems(data);
        })
        .catch((error) => {
        console.error('Error fetching items:', error);
        });
    }, []); // Empty dependency array means this effect runs once when the component mounts


  // Apply filters based on selectedFilters
  let filteredItems = Array.isArray(shopItems) ? [...shopItems] : [];
  if (Object.values(selectedFilters).some(Boolean)) {
    filteredItems = filteredItems.filter((item) => selectedFilters[item.type]);
  }

  // Apply search query filter
  const filteredItemsSearch = filteredItems.filter((item) => {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseQuery = searchQuery.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery);
  });

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