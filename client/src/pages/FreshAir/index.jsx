import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Timer from '../../components/Timer';
import { useTaskContext } from '../../contexts/TaskContext';

import '../../assets/css/task.css';

const FreshAir = () => {
  const [timerStarted, setTimerStarted] = useState(false);

  const { completedTasks, markTaskCompleted } = useTaskContext();

  const taskId = 'freshair';

  const taskCompleted = completedTasks.includes(taskId);

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (taskCompleted) {
      setShowMessage(true);
    }
  }, [taskCompleted]);

  const handleStartTask = () => {
    if (!taskCompleted) {
    setTimerStarted(true);
    }
  };

  const handleTimerFinish = () => {
    markTaskCompleted(taskId);
  };

  return (
    <div className="indexT">
      <div className="divT">
        <div className="task-wrapper">Get some freah air!</div>
        <div className="boxT">
          <img
            className="image-task"
            alt="Image"
            src="/src/assets/images/taskIcons/3.png"
          />
          <p className="content">
            Physcial wellbeing is equally as important as mental wellbeing. Be sure to get up have a stretch and take a step outside for 15 minutes. Breathing in fresh air can provide the brain with fresh oxygen and in turn will boost your productivity.
          </p>
          <div className="button-start">
            {taskCompleted && showMessage && (
              <div className="message-done">
                Task has been completed for today! Keep at it to your heart&apos;s desire
              </div>
            )}
            {!taskCompleted && !timerStarted && (
              <button className="button-link" onClick={handleStartTask}>Start Task</button>
            )}
            {timerStarted && (
              <div className="timer-wrapper">
                <Timer initialTime={5} onFinish={handleTimerFinish} />
              </div>
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

export default FreshAir;