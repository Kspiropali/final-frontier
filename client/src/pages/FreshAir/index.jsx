import React from 'react'
import { Link } from 'react-router-dom';
import '../../assets/css/task.css';

const FreshAir = () => {
  return (
    <div className="indexT">
    <div className="div">
      <div className="text-wrapper">Fresh air</div>
      <div className="box">
        <img
          className="image"
          alt="Image"
          src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/6512cd5a23aefc58b04855f5/img/image-1@2x.png"
        />
        <p className="content">
          Physcial wellbeing is equally as important as mental wellbeing. Be sure to get up have a stretch and take a step outside for 10 minutes. Breathing in fresh air can provide the brain with fresh oxygen and in turn will boost your productivity.
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

export default FreshAir