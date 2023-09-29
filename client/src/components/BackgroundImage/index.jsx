import { useTaskContext } from '../../contexts/TaskContext';

const BackgroundImage = () => {
  const { completionPercentage } = useTaskContext();
  return (
    <div className="bg-img-wrapper" style={{ 
			width: `${completionPercentage}%`, 
			height: `${completionPercentage}%` 
			}}>
			<img 
			className="backgroundim"
			src="/src/assets/images/testbg/rainbow.jpg" 
			/>
    </div>
  );
};

export default BackgroundImage;
