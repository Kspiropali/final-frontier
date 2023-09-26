import React from 'react'
import { Link } from 'react-router-dom';
import '../../assets/css/task.css';

const Mystery = () => {
  return (
    <div className="indexT">
    <div className="div">
      <div className="text-wrapper">Mystery Task</div>
      <div className="box">
        <img
          className="image"
          alt="Image"
          src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/6512cd5a23aefc58b04855f5/img/image-1@2x.png"
        />
        <p className="content">
          While building habits is good once in a while we need to try something different so that we wont get bored. If you dare why not try out a challenge today and see if this task is the one you've been wanting to do all along!
        </p>
        <div className="button-start">
            <Link to="/start-task" className="button-link">
              Start Task
            </Link>
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