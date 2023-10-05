import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../assets/css/coinbalance.css'
import { useShop } from '../../contexts/ShopContext'

const CoinBalance = () => {
    const { userCoinBalance, setUserCoinBalance } = useShop();

    // Fetch the user's coin balance when the component mounts
    useEffect(() => {
        const fetchUserCoinBalance = async () => {
        try {
            const response = await axios.get('/users/coins');
            if (response.data.hasOwnProperty('coins')) {
            setUserCoinBalance(response.data.coins);
            }
        } catch (error) {
            console.error('Error fetching user coin balance:', error);
        }
        };

        fetchUserCoinBalance();
    }, []); // Ensure this effect runs only once when the component mounts

  return (
    <div className="shop-coin-balance">
    <img
        className="shop-coin-icon"
        alt="Image"
        src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/65118b4400e335da865f91ca/img/image-1@2x.png"
    />
    <p className="shop-coin-info">{userCoinBalance}</p>
    </div>
  )
}

export default CoinBalance