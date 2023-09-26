import React from 'react'

const AvatarModal = ({ avatarImage, userDetails }) => {
    return (
        <div>
          <img src={avatarImage} alt="User Avatar" />
          <h2>John Smith</h2>
          <h3>{userDetails.username} @example</h3>
          <p>Age: 31 {userDetails.age}</p>
          <p>Coin Balance: 787 {userDetails.coinBalance}</p>
        </div>
      );
    };

export default AvatarModal