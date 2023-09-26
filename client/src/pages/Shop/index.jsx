import React from "react"
import { ShopSidebar } from "../../components"
import '../../assets/css/shop.css'

const Shop = () => {
    return (
        <main className="shop">
            <ShopSidebar />
            <div className="shop-content"> 
                <h1 className="shop-header">Item Shop</h1>
            </div>
        </main>
      );
    };    

export default Shop