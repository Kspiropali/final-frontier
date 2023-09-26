import React from 'react'
import { Link } from 'react-router-dom';
import '../../assets/css/task.css';

const Breathing = () => {
  return (
    <div className="indexT">
      <div className="div">
        <div className="text-wrapper">Breathing exercise</div>
        <div className="box">
          <img
            className="image"
            alt="Image"
            src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/6512cd5a23aefc58b04855f5/img/image-1@2x.png"
          />
          <p className="content">
            Breathing has many benefits and can be very helpful. For this task take 5 minutes to deep breath using the 4-7-8 method.
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

export default Breathing