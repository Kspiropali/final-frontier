import React from 'react';
import { Link } from 'react-router-dom';
import CompletionBar from '../../components/CompletionBar';
import "../../assets/css/home.css";
import blue from '../../assets/images/homeicons/blue.gif'
import meditation from '../../assets/images/homeicons/meditation.gif'

const Home = () => {
  return (
    <div className="index-home">
      {/* <img 
        className="backgroundim"
        src="/src/assets/images/testbg/rainbow.jpg" 
        alt="Image" 
      /> */}

      <CompletionBar />

      <div className="grid">
        <div className="grid-item image1">
          <Link to="/selfcare">
            <img src={blue}
            width="175"
            height="150"
            alt="Image 1"/>
          </Link>  
        </div>

        <div className="grid-item image2">
          <Link to="/breathe">
            <img src={blue} 
            width="175"
            height="150"
            alt="Image 2"/> 
          </Link>
        </div>

        <div className="grid-item image3">
         <Link to="/familyfriends">
           <img src={blue} 
           width="175"
           height="150"
           alt="Image 3"/>
         </Link>
        </div>

        <div className="grid-item character">
          <img className="character" src={meditation} 
          width="150"
          height="150"
          alt="Character"/>
        </div>

        <div className="grid-item image4">
          <Link to="/air">
            <img src={blue} 
            width="175"
            height="150"
            alt="Image 4"/>
          </Link>
        </div>

        <div className="grid-item image5">
          <Link to="/playlist">
            <img src={blue} width="175"
            height="150"
            alt="Image 5"/>
          </Link>
        </div>

        <div className="grid-item image6">
          <Link to="/mystery">
            <img src={blue} 
            width="175"
            height="150"
            alt="Image 6"/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
