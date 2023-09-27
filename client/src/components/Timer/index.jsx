import React, { useState, useEffect } from 'react';

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

export default Timer;
