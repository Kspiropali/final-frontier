import React, { useState, useEffect } from 'react'
import { InventoryItem } from '../../components'
import axios from 'axios';
import '../../assets/css/modal.css'

const AvatarModal = ({ avatarImage }) => {
    const [inventory, setInventory] = useState([]);

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