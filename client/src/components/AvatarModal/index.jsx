import React, { useState, useEffect } from 'react'
import { InventoryItem } from '../../components'
import axios from 'axios';
import '../../assets/css/modal.css'
import { useShop } from '../../contexts/ShopContext';

const AvatarModal = () => {
    const [inventory, setInventory] = useState([]);
    // const  {setAvatarImage} = useShop()
    useEffect(() => {
        async function fetchUserInventory() {
          try {
            const response = await axios.post('/users/items', {
            });
    
            if (response.status === 200 && Array.isArray(response.data.items)) {
              setInventory(response.data.items);
            } else {
              console.error('Failed to fetch user inventory:', response.status);
            }
          } catch (error) {
            console.error('Error fetching user inventory:', error);
          }
        }
    
        fetchUserInventory();
      }, []);

      // const updateAvatarImage = (newAvatarImage) => {
      //   // setLocalAvatarImage(newAvatarImage);
      //   setAvatarImage(newAvatarImage); // Update the global state (if needed)
      // };

    return (
        <div>
            <div className="modal-content">
                <div className="inventory-header">
                    <h3>Inventory</h3>
                </div>
                <div className="inventory-items">
                    {inventory.map((item, index) => (
                        <InventoryItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AvatarModal
