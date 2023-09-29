import { Link } from 'react-router-dom';
import CompletionBar from '../../components/CompletionBar';
import BackgroundImage from '../../components/BackgroundImage';
import "../../assets/css/home.css";

const Home = () => {

  return (
    <div className="index-home">

      <BackgroundImage />
      <CompletionBar />

      <div className="grid">
        <div className="grid-item image1">
          <Link to="/selfcare">
            <img src="/src/assets/images/homeicons/blue.gif" 
            width="175"
            height="150"
            alt="Image 1"/>
          </Link>  
        </div>

        <div className="grid-item image2">
          <Link to="/breathe">
            <img src="/src/assets/images/homeicons/blue.gif" 
            width="175"
            height="150"
            alt="Image 2"/> 
          </Link>
        </div>

        <div className="grid-item image3">
         <Link to="/familyfriends">
           <img src="/src/assets/images/homeicons/blue.gif" 
           width="175"
           height="150"
           alt="Image 3"/>
         </Link>
        </div>

        <div className="grid-item character">
          <img className="character" src="/src/assets/images/homeicons/meditation.gif" 
          width="150"
          height="150"
          alt="Character"/>
        </div>

        <div className="grid-item image4">
          <Link to="/air">
            <img src="/src/assets/images/homeicons/blue.gif" 
            width="175"
            height="150"
            alt="Image 4"/>
          </Link>
        </div>

        <div className="grid-item image5">
          <Link to="/playlist">
            <img src="/src/assets/images/homeicons/blue.gif" width="175"
            height="150"
            alt="Image 5"/>
          </Link>
        </div>

        <div className="grid-item image6">
          <Link to="/mystery">
            <img src="/src/assets/images/homeicons/blue.gif" 
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