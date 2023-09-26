import React from 'react'
import { SearchItem, FilterItems } from '..';
import { useShop } from '../../contexts/ShopContext'
import avatarImage from '../../assets/images/default.png'
import AvatarModal from '../AvatarModal';

const ShopSidebar = () => {
    const { isModalOpen, userDetails, openModal } = useShop()

  return (
    <>
      <div className="sidebar">
        <div className="avatar-box">
        <img
          src={avatarImage}
          alt="Avatar"
          className="avatar"
          onClick={openModal}
        />
        </div>
        <SearchItem />
        <h3 className="filters-header">Filters</h3>
        <FilterItems />
        <AvatarModal
            isOpen={isModalOpen}
            onRequestClose={openModal}
            userDetails={userDetails}
        />
      </div>
    </>
  );
}

export default ShopSidebar