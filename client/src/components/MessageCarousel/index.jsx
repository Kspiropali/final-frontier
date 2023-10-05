import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

const MessageCarousel = ({ messages, interval = 3000 }) => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, interval);

        return () => clearInterval(intervalId);
    }, [messages, interval]);

    return (
        <div className="message-carousel">
            <div className="message">{messages[currentMessageIndex]}</div>
        </div>
    );
};

MessageCarousel.propTypes = {
    messages: PropTypes.array.isRequired,
    interval: PropTypes.number
};

export default MessageCarousel;