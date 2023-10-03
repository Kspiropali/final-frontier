import React, { useState, useEffect } from 'react'
import { ToggleShop, ShopItem } from '../../components'
import { useShop } from '../../contexts/ShopContext';
import '../../assets/css/shopbox.css'

const ShopBox = () => {
    const { setSelectedItem, selectedFilters, searchQuery } = useShop(); 
    const [items, setItems] = useState([]);

    useEffect(() => {

    async function displayItems() {
    try {
        const response = await fetch("http://localhost:3000/items")
        const data = await response.json()

        if (Array.isArray(data.items)) {
          setItems(data.items);
        } else {
            console.error('Data is not an array:', data);
        }
        } catch (error) {
            console.log("Error fetching items:", error)
        }
    }

    displayItems()
}, [])

 // Apply filters based on selectedFilters
 let filteredItems = Array.isArray(items) ? [...items] : [];
 if (Object.values(selectedFilters).some(Boolean)) {
   filteredItems = filteredItems.filter((item) => selectedFilters[item.type]);
 }

 // Apply search query filter
 const filteredItemsSearch = filteredItems.filter((item) => {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseQuery = searchQuery.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery);
  });

  const categorizedItems = {};

  filteredItemsSearch.forEach((item) => {
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
              <h2 className="category-header">{category}</h2>
              <div className="item-row">
                {category === 'avatar'
                  ? items.map((item) => (
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