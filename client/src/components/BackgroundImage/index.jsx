import { useTaskContext } from '../../contexts/TaskContext';

const BackgroundImage = () => {

  const { completionPercentage } = useTaskContext();

  const progress = completionPercentage;  

	const initialSize = 200;
	const initialRadius = 50; 

  const maxRadius = 50;
  const maxSize = 2000;  

	const radius = initialRadius + (progress/100) * (maxRadius - initialRadius);
	const size = initialSize + (progress/100) * (maxSize - initialSize);

  return (
    <div 
      className="bg-image-wrapper"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${radius}%`
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


