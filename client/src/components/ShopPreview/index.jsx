import React from 'react'
import '../../assets/css/prevbox.css'
import { useShop } from '../../contexts/ShopContext'

const ShopPreview = () => {
    const { selectedItem } = useShop()

  return (
    <>
        <div className="prevbox-container">
            <h1 className="preview-header">Preview</h1>
        </div>
        <div className="prev-box">
        {selectedItem && (
          <>
            <img src={selectedItem.image} alt={selectedItem.name} />
            <h2>{selectedItem.name}</h2>
            <p>{selectedItem.description}</p>
            <p>{selectedItem.price}</p>
          </>
        )}
        </div>
    </>
  )
}

export default ShopPreview