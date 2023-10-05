import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Timer from '../../components/Timer';
import { useTaskContext } from '../../contexts/TaskContext';
import { useShop } from '../../contexts/ShopContext';
import image5 from "../../assets/images/taskIcons/5.png"

import '../../assets/css/task.css';

const Playlist = () => {
  const [timerStarted, setTimerStarted] = useState(false);

  const { completedTasks, markTaskCompleted } = useTaskContext();

  const taskId = 'playlist';

  const taskCompleted = completedTasks.includes(taskId);

  const [showMessage, setShowMessage] = useState(false);

  const { userCoinBalance, setUserCoinBalance } = useShop();

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
    if (!taskCompleted) {
      setUserCoinBalance(userCoinBalance + 10);
    }
  };

  return (
    <div className="indexT">
      <div className="divT">
        <div className="task-wrapper">Music time!</div>
        <div className="boxT">
          <img
            className="image-task"
            alt="Image"
            src={image5}
          />
          <p className="content">
            Music can express so many feelings and can also provide comfort for the emotions that one may wish to convey. Time to take 15 mins to listen to your fav playlist! 
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

export default Playlist;