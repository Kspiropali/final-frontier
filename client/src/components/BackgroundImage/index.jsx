import { useTaskContext } from '../../contexts/TaskContext';
import background from "../../assets/images/testbg/rainbow.jpg"

const BackgroundImage = () => {
  const { completionPercentage } = useTaskContext();
  const progress = completionPercentage;

  const initialBlur = 100; 
  const initialOpacity = 0.2;

  const maxBlur = 0;
  const minOpacity = 1;

  const blur = initialBlur - (progress / 100) * (initialBlur - maxBlur);

  const opacity = initialOpacity - (progress / 100) * (initialOpacity - minOpacity);

  return (
    <div className="bg-image-wrapper">
      <img
        className="backgroundim"
        src={background}
        style={{
          filter: `blur(${blur}px)`,
          opacity: opacity,
        }}
        alt="Background"
      />
    </div>
  );
};

export default BackgroundImage;
