import React from 'react'
import { Link } from 'react-router-dom';
import '../../assets/css/task.css';

const Playlist = () => {
  return (
    <div className="indexT">
    <div className="div">
      <div className="text-wrapper">My playlist</div>
      <div className="box">
        <img
          className="image"
          alt="Image"
          src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/6512cd5a23aefc58b04855f5/img/image-1@2x.png"
        />
        <p className="content">
          Music can express so many feelings and can also provide comfort for the emotions that one may wish to convey. Time to take 15 mins to listen to your fav playlist! 
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

export default Playlist