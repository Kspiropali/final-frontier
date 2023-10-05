import React from "react"
import { ShopSidebar, ShopBox, ShopPreview, FeaturedItems, CoinBalance } from "../../components"
import '../../assets/css/shop.css'

const Shop = () => {
    return (
        <main className="shop">
            <ShopSidebar />
            <div className="shop-content"> 
                <div className="box-container">
                    <div className="shop-side">
                        <h1 className="shop-header">Item Shop</h1>
                        <FeaturedItems />
                        <ShopBox />
                    </div>
                    <div className="prev-side">
                        <CoinBalance />
                        <ShopPreview />
                    </div>
                </div>
            </div>
    </main>
      );
    };    

export default Shop