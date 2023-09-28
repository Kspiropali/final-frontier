import React from 'react';
import { useTaskContext } from '../../contexts/TaskContext';

const CompletionBar = () => {
  const { completionPercentage } = useTaskContext();
  return (
    <div className="completion-bar">
      <div
        className="completion"
        style={{ width: `${completionPercentage}%` }}
      />
    </div>
  );
};

export default CompletionBar;
