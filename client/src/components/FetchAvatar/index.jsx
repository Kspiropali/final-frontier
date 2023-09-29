import React, { useEffect, useState } from 'react';

import testCoin from '../../assets/images/testitem/coin.png';

const FetchAvatar = ({ onAvatarItemsFetched }) => {
  useEffect(() => {
    fetch('https://api.dicebear.com/7.x/adventurer/png')
      .then((response) => response.blob())
      .then((blob) => {
        const dataUrl = URL.createObjectURL(blob);

        const avatarItem = {
          id: 'avatar-1',
          image: dataUrl,
          name: 'Adventurer',
          type: 'avatar',
          description: 'An adventurous avatar for your profile',
          price: 30,
          coinImage: testCoin
        };

        onAvatarItemsFetched([avatarItem]);
      })
      .catch((error) => {
        console.error('Error fetching avatar items:', error);
      });
  }, [onAvatarItemsFetched]);

  return null;
};

export default FetchAvatar;