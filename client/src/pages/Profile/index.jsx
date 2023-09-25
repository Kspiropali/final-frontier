import React from 'react'
import "../../assets/css/profile.css";

const Profile = () => {
  return (
    <div className="index">
      <div className="container1">
        <img
          className="ellipse"
          alt="Ellipse"
          src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/65118b4400e335da865f91ca/img/ellipse-2@2x.png"
        />
        <div className="text-wrapper">
          <div className="text-wrapper-1">Alias</div>
          <div className="text-wrapper-2">Username, age, gender</div>
          <div className="text-wrapper-3">My quote</div>
          <p className="p">Team work makes the dream work</p>
          <div className="text-wrapper-4">My goals</div>
          <p className="text-wrapper-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
      </div>
			<div className="flex-container">
				<div className="container2">
					<div className="rectangle-1">
						<div className="text-wrapper-6">My coins</div>
						<div className="rectangle-2">
							<img
							className="img"
							alt="Image"
							src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/65118b4400e335da865f91ca/img/image-1@2x.png"
							/>
							<div className="text-wrapper-7">950</div>
						</div>
					</div>
				</div>
				<div className="container3">
					<div className="rectangle-3">
						<div className="text-wrapper-9">Shop</div>
						<div className="rectangle-4">
							<button className="shop-button">Enter here</button>
						</div>
					</div>
				</div>
				<div className="container4">
						<div className="rectangle-5">
							<div className="text-wrapper-11">Login streak</div>
							<div className="rectangle-6">
								<div className="text-wrapper-12">5 days</div>
							</div>
					</div>
				</div>
				<img
						className="rectangle-7"
						alt="Rectangle"
						src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/65118b4400e335da865f91ca/img/rectangle-8.png"
				/>
				<div className="div-wrapper">
						<div className="text-wrapper-13">
								<button className="edit-button">Edit Profile</button>
						</div>
				</div>
			</div>
  </div>
  )
}

export default Profile
