import React from 'react';
import { useProfile } from '../../contexts/ProfileContext';

const Buttons = () => {
	const { toggleEdit } = useProfile();

	return (
		<div className="div-wrapper">
			<div className="text-wrapper-13">
				<button className="edit-button" onClick={toggleEdit}>Edit Profile</button>
			</div>
		</div>
	);
};

export default Buttons;
