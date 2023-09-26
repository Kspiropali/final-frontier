import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ProfileEdit = (props) => {
	const [editing, setEditing] = useState(false);
	const [image, setImage] = useState(props.image);
	const [age, setAge] = useState(props.age);
	const [gender, setGender] = useState(props.gender);
	const [quote, setQuote] = useState(props.quote);
	const [goals, setGoals] = useState(props.goals);
	const [alias, setAlias] = useState(props.alias);

	const toggleEdit = () => {
		setEditing(!editing);
	}
	const handleAliasChange = (e) => {
		setAlias(e.target.value);
	}
	const handleImageChange = (e) => {
		setImage(e.target.value);
	}
	const handleAgeChange = (e) => {
		setAge(e.target.value);
	}
	const handleGenderChange = (e) => {
		setGender(e.target.value);
	}
	const handleQuoteChange = (e) => {
		setQuote(e.target.value);
	}
	const handleGoalsChange = (e) => {
		setGoals(e.target.value);
	}
	const handleSave = () => {
		setEditing(false);

		props.onSave({
			alias,
			image,
			age,
			gender,
			quote,
			goals
		});
	}

	return (
		<div>
			{
				editing ? (
					<div>
						<input value={alias} onChange={handleAliasChange} />
						<input value={image} onChange={handleImageChange} />
						<input value={age} onChange={handleAgeChange} />
						<input value={gender} onChange={handleGenderChange} />
						<input value={quote} onChange={handleQuoteChange} />
						<input value={goals} onChange={handleGoalsChange} />
					</div>
				) : (
					<div>
						<div>{alias}</div>
						<img src={image} />
						<div>{age}</div>
						<div>{gender}</div>
						<div>{quote}</div>
						<div>{goals}</div>
					</div>
				)
			}

			<button onClick={toggleEdit}>
				{editing ? 'Save' : 'Edit'}
			</button>

			<button onClick={handleSave}>Save Changes</button>
		</div>
	);
}

ProfileEdit.propTypes = {
	alias: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	age: PropTypes.string.isRequired,
	gender: PropTypes.string.isRequired,
	quote: PropTypes.string.isRequired,
	goals: PropTypes.string.isRequired,
	onSave: PropTypes.func.isRequired
};

export default ProfileEdit;
