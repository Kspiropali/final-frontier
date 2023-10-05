import React from 'react';
import axios from 'axios';

const InventoryItem = ({ item, onEquip, updateAvatarImage }) => {
  const equipItem = async () => {
    // Display a confirmation alert before equipping the item
    const confirmEquip = window.confirm(`Do you want to equip ${item.name}?`);

    if (confirmEquip) {
      try {
        // Make an API call to equip the selected item
        const response = await axios.post('/users/profile/update', {
            equippedItemId: item.id, // Send the item ID to equip
          });

        if (response.data.success) {
          // Inform the parent component that the item was equipped
          onEquip(item);

          if (item.type === 'avatar') {
            updateAvatarImage(item.image);
          }

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
    <div className="inventory-item" onClick={equipItem}>
      <img className="inventory-image" src={item.image} alt={item.name} />
      <p>{item.name}</p>
    </div>
  );
};

export default InventoryItem;