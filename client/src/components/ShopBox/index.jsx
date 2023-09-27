import React from 'react'
import ToggleShop from '../../components/ToggleShop'
import '../../assets/css/shopbox.css'

const ShopBox = () => {
  return (
    <>
     <h1 className="shop-header">Item Shop</h1>
     <div>
        <ToggleShop />
     </div>
    <div className="box"></div>
    </>
  )
}

export default ShopBox