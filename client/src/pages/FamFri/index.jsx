import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Timer from '../../components/Timer';
import { useTaskContext } from '../../contexts/TaskContext';
import image2 from "../../assets/images/taskIcons/2.png"

import '../../assets/css/task.css';

const FamFri = () => {
  const [timerStarted, setTimerStarted] = useState(false);

  const { completedTasks, markTaskCompleted } = useTaskContext();

  const taskId = 'famfri';

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
        <div className="task-wrapper">Family and friends time</div>
        <div className="boxT">
          <img
            className="image-task"
            alt="Image"
            src={image2}
          />
          <p className="content">
            One of the best ways one can relax and find out more about themselves and the world, is to connect and spend time with those who you love and appriciate. Take 30 mins to spend some quality time with loved ones.
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

export default FamFri;