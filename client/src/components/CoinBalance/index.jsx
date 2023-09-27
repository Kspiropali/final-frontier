import React from 'react'
import '../../assets/css/coinbalance.css'

const CoinBalance = () => {
    const userCoinBalance = 1000

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