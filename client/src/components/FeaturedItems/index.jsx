import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../assets/css/featureditem.css'
import { ShopItem } from '../../components/'
import { useShop } from '../../contexts/ShopContext';

const FeaturedItems = () => {
    const { setSelectedItem } = useShop();
    const [featuredItems, setFeaturedItems] = useState([]);

    useEffect(() => {
        // Fetch featured items
        async function fetchFeaturedItems() {
          try {
            const response = await axios.post('/items/all')
            const data = response.data;
    
            if (Array.isArray(data.items)) {
                const featuredItems = data.items.filter((item) => item.type === 'featured');
                setFeaturedItems(featuredItems);
              } else {
                console.error('Items data is not an array:', data);
              }
            } catch (error) {
              console.log('Error fetching items:', error);
            }
          }
    
        fetchFeaturedItems();
      }, []);

      const handleItemClick = (item) => {
        setSelectedItem(item);
    };    

      return (
        <div className="featured-items-box">
            <h2 className="featured-category">Featured</h2>
            <div className="featured-item-row">
            {featuredItems.map((item) => (
                <ShopItem
                key={item.id}
                item={item}
                onItemClick={() => handleItemClick(item)}
                />
            ))}
            </div>
        </div>
        );
    }

export default FeaturedItems