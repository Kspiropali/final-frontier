import React from 'react'
import '../../assets/css/modal.css'

const AvatarModal = ({ avatarImage, userDetails }) => {
    return (
        <div className="modal-content">
            <div className="top-section">
                <img src={avatarImage} alt="User Avatar" className="avatar-image" />
                <div className="alias-username">
                    <h2 className="alias">John Smith</h2>
                    <h3 className="username">{userDetails.username} @example</h3>
                </div>
            </div>
            <div className="user-info">
                <div className="about">
                    <h3>About</h3>
                </div>
                <p>Age: 31 {userDetails.age}</p>
                <p>Gender: Male {userDetails.gender}</p>
                <div>
                    <h3 className="goals">Goals</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                       tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                       veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                       commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                       velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id 
                       est laborum.
                    </p>
                </div>
            </div>
            <div className="coin-balance">
            <img
				className="img"
				alt="Image"
				src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/65118b4400e335da865f91ca/img/image-1@2x.png"
			/>
			<p className="coin-info">721</p>
            </div>
        </div>
      );
    };

export default AvatarModal