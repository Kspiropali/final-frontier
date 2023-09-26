import React from 'react'
import Modal from 'react-modal'
import avatarImage from '../../assets/images/default.png'

const AvatarModal = ({ isOpen, onRequestClose, userDetails }) => {
  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Avatar Modal"
    >
      <div>
        <img src={avatarImage} alt="User Avatar" />
        <h2>John Smith{userDetails.alias}</h2>
        <h3>{userDetails.username} @example</h3>
        <p>Age: 41 {userDetails.age}</p>
        <p>Coin Balance: 787 {userDetails.coinBalance}</p>
      </div>
    </Modal>
  )
}

export default AvatarModal