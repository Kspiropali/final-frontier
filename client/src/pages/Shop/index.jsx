import React from "react"
import { ShopSidebar, ShopContent } from "../../components"
import '../../assets/css/shop.css'

const Shop = () => {
    return (
        <main className="shop">
            <ShopSidebar />
            <div className="shop-content"> 
            <ShopContent />
            </div>
        </main>
      );
    };    

export default Shop