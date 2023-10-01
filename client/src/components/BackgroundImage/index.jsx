import { useTaskContext } from '../../contexts/TaskContext';

const BackgroundImage = () => {

  const { completionPercentage } = useTaskContext();

  const progress = completionPercentage;  

  const maxRadius = 50;

  const radius = maxRadius - (maxRadius * progress) / 100;

  const borderRadius = `${radius}%`;

  return (
    <div 
      className="bg-image-wrapper"
      style={{
        borderRadius
      }} 
    >
      <img 
        className="backgroundim"
        src="/src/assets/images/testbg/rainbow.jpg" 
      />
    </div>
  );

};

export default BackgroundImage;


