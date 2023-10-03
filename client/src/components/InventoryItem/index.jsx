import React from 'react';

const InventoryItem = ({ item }) => {
    return (
        <div className="inventory-item">
            <img className="inventory-image" src={item.image} alt={item.name} />
            <p>{item.name}</p>
        </div>
    );
};

export default InventoryItem;