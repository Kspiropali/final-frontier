import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TaskContext = createContext();

export const useTaskContext = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  const markTaskCompleted = (taskId) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
    }
  };

  useEffect(() => {
    const percentage = (completedTasks.length / 6) * 100;
    setCompletionPercentage(percentage);
  }, [completedTasks]);

  return (
    <TaskContext.Provider value={{ completedTasks, markTaskCompleted, completionPercentage }}>
      {children}
    </TaskContext.Provider>
  );
};

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
