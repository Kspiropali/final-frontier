import React from "react"
import { ShopSidebar, ShopBox, ShopPreview } from "../../components"
import '../../assets/css/shop.css'

const Shop = () => {
    return (
        <main className="shop">
            <ShopSidebar />
            <div className="shop-content"> 
                <div className="box-container">
                    <ShopBox />
                    <ShopPreview />
                </div>
            </div>
    </main>
      );
    };    

export default Shop