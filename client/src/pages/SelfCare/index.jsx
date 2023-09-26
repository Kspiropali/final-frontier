import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/task.css';

const SelfCare = () => {
  return (
    <div className="indexT">
      <div className="div">
        <div className="text-wrapper">Self-care</div>
        <div className="box">
          <img
            className="image"
            alt="Image"
            src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/6512cd5a23aefc58b04855f5/img/image-1@2x.png"
          />
          <p className="content">
            Time for some selfcare!
            Spend 10 minutes doing something for yourself. This can be doing a skincare routine or even eating a snack! Its all about what makes you happy and feel good.
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
  );
};

export default SelfCare;
