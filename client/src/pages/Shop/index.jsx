import React from "react"
import { ShopSidebar, ShopBox, ShopPreview, FeaturedItems, CoinBalance } from "../../components"
import '../../assets/css/shop.css'

const Shop = () => {
    return (
        <main className="shop">
            <ShopSidebar />
            <div className="shop-content"> 
                <div className="box-container">
                    <div className="featured-container">
                        <FeaturedItems />
                    </div>
                    <ShopBox />
                    <ShopPreview />
                    <CoinBalance />
                </div>
            </div>
    </main>
      );
    };    

export default Shop