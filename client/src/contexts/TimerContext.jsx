import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const TimerContext = createContext();

const TimerProvider = ({ targetTime, children }) => {
  const [remainingTime, setRemainingTime] = useState(targetTime);

  return (
    <TimerContext.Provider value={{ remainingTime, setRemainingTime }}>
      {children}
    </TimerContext.Provider>
  );
};

TimerProvider.propTypes = {
  targetTime: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

const useTimer = () => {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error('TimerContext must be used within a TimerProvider');
  }

  return context;
};

export { TimerProvider, useTimer };

