import React from 'react'
import { ToggleShop } from '../../components'
import '../../assets/css/shopbox.css'

const ShopBox = () => {
  return (
    <>
    <div className="shop-box-container">
     <h1 className="shop-header">Item Shop</h1>
     <div className="toggle-buttons-container">
        <ToggleShop />
     </div>
     </div>
    <div className="box"></div>
    </>
  )
}

export default ShopBox