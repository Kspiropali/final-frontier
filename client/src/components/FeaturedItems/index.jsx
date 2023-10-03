import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../assets/css/featureditem.css'
import { ShopItem } from '../../components/'

const FeaturedItems = () => {
    const [featuredItems, setFeaturedItems] = useState([]);

    useEffect(() => {
        // Fetch featured items
        async function fetchFeaturedItems() {
          try {
            const response = await axios.get('http://127.0.0.1:3000/items')
            const data = response.data;
    
            if (Array.isArray(data.items)) {
                // Filter items by type 'featured'
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

      return (
        <div className="featured-items-container"> {/* Apply the featured items container class */}
            <h2>Featured Items</h2>
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