import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { SearchItem, FilterItems, AvatarModal } from '..';
import { useShop } from '../../contexts/ShopContext'
import 'animate.css'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const ShopSidebar = () => {
    const { openModal, searchQuery, setSearchQuery, setAvatarImage } = useShop()
    const [avatarImage, setLocalAvatarImage] = useState(null); // Local state for avatar image


    useEffect(() => {
        async function fetchUserProfile() {
          try {
            const response = await axios.post('/users/profile');
            if (response.data.avatar) {
              // Set the avatarImage state with the fetched URL
              setLocalAvatarImage(response.data.avatar);
              setAvatarImage(response.data.avatar);
            }
          } catch (error) {
            console.error('Error fetching user profile:', error);
          }
        }
    
        fetchUserProfile();
      }, [setAvatarImage]); 

    const showModal = () => {
        MySwal.fire({
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
          html: <AvatarModal />,
          showConfirmButton: false,
          width: '600px',
          customClass: {
            container: 'custom-modal'
          },
          background: '#fad3d4'
        }).then(() => {
          openModal();
        });
    };

    const updateAvatarImage = (newAvatarImage) => {
        setLocalAvatarImage(newAvatarImage);
        setAvatarImage(newAvatarImage); // Update the global state (if needed)
      };
    
  return (
    <>
      <div className="sidebar">
        <div className="inventory-container" onClick={showModal}>
            <div className="avatar-box">
              {avatarImage && (
                <img
                  src={avatarImage}
                  alt="Avatar"
                  className="avatar"
                  onClick={showModal}
                />
              )}
            </div>
            <div>
                <button className="inventory" onClick={showModal}>
                  Inventory
                </button>
            </div>
        </div>
        <SearchItem searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <h3 className="filters-header">Filters</h3>
        <FilterItems />
      </div>
    </>
  );
}

export default ShopSidebar