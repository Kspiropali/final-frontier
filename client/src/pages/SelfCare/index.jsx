import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Timer from '../../components/Timer';

import '../../assets/css/task.css';

const SelfCare = () => {
  const [timerStarted, setTimerStarted] = useState(false);

  const handleStartTask = () => {
    setTimerStarted(true);
  };

  const handleTimerFinish = () => {
    // Handle actions after the timer finishes (e.g., display a message)
    // Here, you can show a message or perform any action you want
  };

  return (
    <div className="indexT">
      <div className="div">
        <div className="text-wrapper">Self-care</div>
        <div className="box">
          <img
            className="image"
            alt="Image"
            src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/6512cd5a23aefc58b04855f5/img/image-1@2x.png"
          />
          <p className="content">
            Time for some self-care! Spend 10 minutes doing something for yourself. This can be doing a skincare routine or even eating a snack! It&apos;s all about what makes you happy and feel good.
          </p>
          <div className="button-start">
            {timerStarted ? (
              <Timer initialTime={60} onFinish={handleTimerFinish} />
            ) : (
              <button className="button-link" onClick={handleStartTask}>Start Task</button>
            )}
          </div>
        </div>
        <div className="button-home">
          <Link to="/" className="button-link">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelfCare;
