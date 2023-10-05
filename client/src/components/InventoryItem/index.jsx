import React from 'react';
import axios from 'axios';

const InventoryItem = ({ item, onEquip }) => {
  const equipItem = async () => {
    // Display a confirmation alert before equipping the item
    const confirmEquip = window.confirm(`Do you want to equip ${item.name}?`);

    if (confirmEquip) {
      try {
        // Make an API call to equip the selected item
        const response = await axios.patch('/users/profile', { itemId: item.id });

        if (response.data.success) {
          // Inform the parent component that the item was equipped
          onEquip(item);

          // Log the success message or perform other actions as needed
          console.log(`Equipped ${item.name}`);
        } else {
          console.error('Failed to equip item.');
        }
      } catch (error) {
        console.error('Error equipping item:', error);
      }
    }
  };

  return (
    <div className="inventory-item">
      <img className="inventory-image" src={item.image} alt={item.name} onClick={equipItem} />
      <p>{item.name}</p>
    </div>
  );
};

export default InventoryItem;