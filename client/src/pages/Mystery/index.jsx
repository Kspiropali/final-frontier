import { useState } from 'react'
import { Link } from 'react-router-dom';
import Timer from '../../components/Timer';
import { useTaskContext } from '../../contexts/TaskContext';

import '../../assets/css/task.css';

const Mystery = () => {
  const [timerStarted, setTimerStarted] = useState(false);

  const [taskCompleted, setTaskCompleted] = useState(false);

  const { markTaskCompleted } = useTaskContext();

  const handleStartTask = () => {
    setTimerStarted(true);
  };

  const handleTimerFinish = () => {
    setTaskCompleted(true);
    markTaskCompleted('selfcare');
  };

  return (
    <div className="indexT">
    <div className="divT">
      <div className="text-wrapper">Mystery Task</div>
      <div className="boxT">
        <img
          className="image"
          alt="Image"
          src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/6512cd5a23aefc58b04855f5/img/image-1@2x.png"
        />
        <p className="content">
            While building habits is good once in a while we need to try something different so that we wont get bored. If you dare why not try out a challenge today and see if this task is the one you&apos;ve been wanting to do all along!
        </p>
        <div className="button-start">
            {taskCompleted && (
              <div className="message-done">
                Task has been completed for today! Keep at it to your hearts desire
              </div>
            )}
            {timerStarted ? (
              <div className="timer-wrapper">
              <Timer initialTime={10} onFinish={handleTimerFinish} />
              </div>
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
  )
}

export default Mystery