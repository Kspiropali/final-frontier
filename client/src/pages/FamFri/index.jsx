import React from 'react'
import { Link } from 'react-router-dom';
import '../../assets/css/task.css';


const FamFri = () => {
  return (
    <div className="indexT">
      <div className="div">
        <div className="text-wrapper">Spend time with family and friends</div>
        <div className="box">
          <img
            className="image"
            alt="Image"
            src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/6512cd5a23aefc58b04855f5/img/image-1@2x.png"
          />
          <p className="content">
            One of the best ways for one to connect with themselves and the world is to conncet and spend time with those who you love and appriciate. Take 30 mins to spend some quality time with loved ones.
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

export default FamFri