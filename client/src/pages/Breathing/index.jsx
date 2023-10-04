import { useState } from 'react'
import { Link } from 'react-router-dom';
import Timer from '../../components/Timer';
import { useTaskContext } from '../../contexts/TaskContext';

import '../../assets/css/task.css';

const Breathing = () => {
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
        <div className="task-wrapper">Breathing exercise</div>
        <div className="boxT">
          <img
            className="image"
            alt="Image"
            src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/6512cd5a23aefc58b04855f5/img/image-1@2x.png"
          />
          <p className="content">
            Breathing has many benefits and can be very helpful. For this task take 5 minutes to deep breath using the 4-7-8 method.
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

export default Breathing