import React, { useState, useEffect } from 'react'
import { SearchItem, FilterItems } from '../../components';
import avatarImage from '../../assets/images/default.png'

const ItemSidebar = () => {

  return (
    <>
      <div className="sidebar">
        <div className="avatar-box">
        <img
          src={avatarImage}
          alt="User Avatar"
          className="avatar"
        />
        </div>
        <SearchItem />
        <h3 className="filters-header">Filters</h3>
        <FilterItems />
      </div>
    </>
  );
}

export default ItemSidebar