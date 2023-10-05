import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Timer from '../../components/Timer';
import { useTaskContext } from '../../contexts/TaskContext';

import '../../assets/css/task.css';

const Breathing = () => {
  const [timerStarted, setTimerStarted] = useState(false);

  const { completedTasks, markTaskCompleted } = useTaskContext();

  const taskId = 'breathing';

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
        <div className="task-wrapper">Breathing</div>
        <div className="boxT">
          <img
            className="image-task"
            alt="Image"
            src="/src/assets/images/taskIcons/1.png"
          />
          <p className="content">
            Breathing has many benefits and can be very helpful. For this task take 5 minutes to deep breath using the 4-7-8 method. That&apos;s 4 seconds to inhale, 7 seconds to hold, and 8 seconds to exhale. Feel your stress melt away.
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
                <Timer initialTime={300} onFinish={handleTimerFinish} />
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

export default Breathing;
