import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import CompletionBar from '../../components/CompletionBar';
import BackgroundImage from '../../components/BackgroundImage';
import "../../assets/css/home.css";
import green from '../../assets/images/homeicons/green_leaf.gif';
import brown from '../../assets/images/homeicons/brown_leaf.gif';
import c1 from '../../assets/images/homeicons/c1.png';
import { useTaskContext } from '../../contexts/TaskContext';

const ResetProgressButton = () => {
  const { resetProgress } = useTaskContext();

  return (
    <button onClick={resetProgress}>Reset Progress</button>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track user authentication status

  const checkLoggedIn = () => {
    if(isLoggedIn) {
      setIsLoggedIn(true);
    }
  }

  useEffect(() => {
    searchParams.get('token') ? navigate("/reset-password", 
      {state: {token: searchParams.get('token')}}) : "", 
      checkLoggedIn()
  }, [])

  return (
    <>
      {!isLoggedIn ? (
        <h1 className="welcome">Welcome to WellSpace!</h1>
      ) : (
        <div className="index-home">
          
          <CompletionBar />
          <img className="character" src={c1} alt="Character" />
          <BackgroundImage />

          <div className="grid-home">
            <div className="grid-home-item image1">
              <Link to="/selfcare">
                <img src={green} width="175" height="150" alt="Image 1" />
              </Link>
            </div>

            <div className="grid-home-item image2">
              <Link to="/breathe">
                <img src={brown} width="150" height="150" alt="Image 2" />
              </Link>
            </div>

            <div className="grid-home-item image3">
              <Link to="/familyfriends">
                <img src={brown} width="150" height="150" alt="Image 3" />
              </Link>
            </div>
{/* 
            <div className="grid-home-item bg">
              <BackgroundImage />
            </div> */}

            <div className="grid-home-item image4">
              <Link to="/air">
                <img src={green} width="175" height="150" alt="Image 4" />
              </Link>
            </div>

            <div className="grid-home-item image5">
              <Link to="/playlist">
                <img src={green} width="175" height="150" alt="Image 5" />
              </Link>
            </div>

            <div className="grid-home-item image6">
              <Link to="/mystery">
                <img src={brown} width="150" height="150" alt="Image 6" />
              </Link>
            </div>
          </div>
          <ResetProgressButton />
        </div>
      )}
    </>
  );
}

export default Home;
