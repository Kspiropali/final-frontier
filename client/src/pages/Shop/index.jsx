import React from "react"
import { ShopSidebar, ShopBox } from "../../components"
import '../../assets/css/shop.css'

const Shop = () => {
    return (
        <main className="shop">
            <ShopSidebar />
        <div className="shop-content"> 
            <ShopBox />
        </div>
        </main>
      );
    };    

export default Shop