import React from 'react'
import { useShop } from '../../contexts/ShopContext'
import '../../assets/css/toggleshop.css'

const ToggleShop = () => {
    const { showAllItems, toggleShowAllItems, showFeaturedItems, toggleShowFeaturedItems } = useShop(); // Use the context

  return (
    <div className="toggleshop-container">
        <button
        className={`toggle-button ${showAllItems ? 'active' : ''}`}
        onClick={toggleShowAllItems}
        >
            All Items
        </button>
        <button
        className={`toggle-button ${showFeaturedItems ? 'active' : ''}`}
        onClick={toggleShowFeaturedItems}
       >
            Featured
        </button>
    </div>
  )
}

export default ToggleShop