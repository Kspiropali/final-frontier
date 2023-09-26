import React from 'react'
import { SearchItem, FilterItems, AvatarModal } from '..';
import { useShop } from '../../contexts/ShopContext'

import avatarImage from '../../assets/images/default.png'

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import 'animate.css'

const MySwal = withReactContent(Swal);

const ShopSidebar = () => {
    const { userDetails, openModal } = useShop()

    const showModal = () => {
        MySwal.fire({
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
          html: <AvatarModal avatarImage={avatarImage} userDetails={userDetails} />,
        }).then(() => {
          openModal();
        });
    };

  return (
    <>
      <div className="sidebar">
        <div className="avatar-box">
        <img
          src={avatarImage}
          alt="Avatar"
          className="avatar"
          onClick={showModal}
        />
        </div>
        <SearchItem />
        <h3 className="filters-header">Filters</h3>
        <FilterItems />
      </div>
    </>
  );
}

export default ShopSidebar