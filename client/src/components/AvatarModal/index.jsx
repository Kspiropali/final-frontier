import React, { useState, useEffect } from 'react'
import { InventoryItem } from '../../components'
import '../../assets/css/modal.css'
import testItem from '../../assets/images/testitem/hat.png'
import testItem2 from '../../assets/images/testavatars/default.png'
import testItem3 from '../../assets/images/testbg/rainbow.jpg'

const AvatarModal = ({ avatarImage }) => {
    const [inventory, setInventory] = useState([]);

    // Assuming you have a function to fetch the user's inventory from the backend
    useEffect(() => {
        // Fetch the user's inventory data from the backend here
        // Example:
        // fetch('/api/user/inventory')
        //     .then((response) => response.json())
        //     .then((data) => setInventory(data));
        setInventory(dummyInventory)
    }, []); // Ensure this effect runs only once when the component mounts

    const dummyInventory = [
        {
            id: 1,
            name: 'Hat',
            image: testItem
        },
        {
            id: 2,
            name: 'Rainbow',
            image: testItem3
        },
        {
            id: 3,
            name: 'Bot',
            image: testItem2
        },
        {
            id: 4,
            name: 'Empty',
            image: 'imageurl'
        },
        {
            id: 5,
            name: 'Empty',
            image: 'imageurl'
        },
        {
            id: 5,
            name: 'Empty',
            image: 'imageurl'
        },
        {
            id: 5,
            name: 'Empty',
            image: 'imageurl'
        },
        {
            id: 5,
            name: 'Empty',
            image: 'imageurl'
        },
        {
            id: 5,
            name: 'Empty',
            image: 'imageurl'
        },
        {
            id: 5,
            name: 'Empty',
            image: 'imageurl'
        },
        {
            id: 5,
            name: 'Empty',
            image: 'imageurl'
        },
        {
            id: 5,
            name: 'Empty',
            image: 'imageurl'
        },
        {
            id: 5,
            name: 'Empty',
            image: 'imageurl'
        },
        {
            id: 5,
            name: 'Empty',
            image: 'imageurl'
        },
        {
            id: 5,
            name: 'Empty',
            image: 'imageurl'
        },
        {
            id: 5,
            name: 'Empty',
            image: 'imageurl'
        }
    ]

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