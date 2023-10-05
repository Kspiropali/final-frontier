import React from 'react';
import axios from 'axios';

const InventoryItem = ({ item, onEquip, updateAvatarImage }) => {
  const equipItem = async () => {
    // Display a confirmation alert before equipping the item
    const confirmEquip = window.confirm(`Do you want to equip ${item.name}?`);
    if (confirmEquip) {
      try {
        // Make an API call to equip the selected item
        const response = await axios.post('/users/profile/update', item)
        console.log("response",response)
        console.log("response.data", response.text)
        if (response.status == 200) {
          // Inform the parent component that the item was equipped
          console.log(item)
          // onEquip(item);
          if (item.type === 'avatar') {
            // const img64 = item.image.split(",")
            // console.log(img64[1])
            updateAvatarImage(item);
            console.log(`Equipped ${item.name}`); // Log the success message or perform other actions as needed
          }
          
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
