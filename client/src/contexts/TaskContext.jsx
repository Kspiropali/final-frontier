import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TaskContext = createContext();

export const useTaskContext = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [completedTasks, setCompletedTasks] = useState(
    JSON.parse(localStorage.getItem('completedTasks')) || []
  );

  const [completionPercentage, setCompletionPercentage] = useState(0);

  const markTaskCompleted = (taskId) => {
    if (!completedTasks.includes(taskId)) {
      const updatedCompletedTasks = [...completedTasks, taskId];
      setCompletedTasks(updatedCompletedTasks);
      localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTasks));
    }
  };

  const resetProgress = () => {
    setCompletedTasks([]);
    setCompletionPercentage(0);
    // You may also want to clear the localStorage here
    localStorage.removeItem('completedTasks');
  };

  useEffect(() => {
    const percentage = (completedTasks.length / 6) * 100;
    setCompletionPercentage(percentage);
  }, [completedTasks]);

  return (
    <TaskContext.Provider value={{ completedTasks, markTaskCompleted, completionPercentage, resetProgress }}>
      {children}
    </TaskContext.Provider>
  );
};


TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
