import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

const Timer = ({ initialTime, onFinish }) => {
	const [time, setTime] = useState(initialTime);

	useEffect(() => {
		if (time > 0) {
			const timer = setInterval(() => {
				setTime(prevTime => prevTime - 1);
			}, 1000);
			return () => clearInterval(timer);
		} else {
			onFinish();
		}
	}, [time, onFinish]);

	const formatTime = seconds => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
	};

	return (
		<div className="countdown-timer">
			<p>Time remaining: {formatTime(time)}</p>
		</div>
	);
};

Timer.propTypes = {
	initialTime: PropTypes.number.isRequired,
	onFinish: PropTypes.func.isRequired,
};

export default Timer;
