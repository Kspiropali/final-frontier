import React from 'react'
import { Link } from 'react-router-dom'
import CompletionBar from '../../components/CompletionBar';
import WalkingCharacter from '../../components/WalkingCharacter';
import "../../assets/css/home.css";

const Home = () => {
  return (
    <div className="index-home">
      <img
        className="backgroundim"
        alt="Image"
        src="/src/assets/images/testbg/rainbow.jpg"
      />
      <CompletionBar />
      <div className="images-container">
        <div className="images">
          <Link to="/selfcare">
          <img
            className="image1"
            alt="Image"
            src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/651200163f4e55995d9af7ea/img/image-1@2x.png"
          />
          </Link>
          <Link to="/breathe">
          <img
            className="image2"
            alt="Image"
            src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/651200163f4e55995d9af7ea/img/image-1@2x.png"
          />
          </Link>
          <Link to="/familyfriends">
          <img
            className="image3"
            alt="Image"
            src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/651200163f4e55995d9af7ea/img/image-1@2x.png"
          />
          </Link>
          <Link to="/air">
          <img
            className="image4"
            alt="Image"
            src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/651200163f4e55995d9af7ea/img/image-1@2x.png"
          />
          </Link>
          <Link to="/playlist">
          <img
            className="image5"
            alt="Image"
            src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/651200163f4e55995d9af7ea/img/image-1@2x.png"
          />
          </Link>
          <Link to="/mystery">
          <img
            className="image6"
            alt="Image"
            src="https://cdn.animaapp.com/projects/651165e23f4e55995d9af710/releases/651200163f4e55995d9af7ea/img/image-1@2x.png"
          />
          </Link>
        </div>
      </div>
      <div className="character-container">
          <img className="character" 
          src="/src/assets/images/avatars/panda.png" />
      </div>
  </div>
  )
}

export default Home