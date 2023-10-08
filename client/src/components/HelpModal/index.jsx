import React from 'react'
import '../../assets/css/modal.css'

const HelpModal = () => {

	return (
		<div>
            <h3 className='help-title'>How to use WellSpace</h3>
            <p className='help-text'> 1. Click on one of the floating task buttons to see task details.</p>
            <p className='help-text'> 2. Once on the task page read the task description.</p>
            <p className='help-text'> 3. If you are ready, then <strong>click on the <em>-Start Task-</em> button</strong> to start the task. If you want to complete the task later just <strong>click on the <em>-Back to Home-</em> button</strong>!</p>
            <p className='help-text'> 4. Once you have completed the task, it will automatically be marked as complete.</p>
            <p className='help-text'> 5. You can track your progress on the progress bar at the top of the page. This will be reset automatically every morning.</p>
            <p className='help-text'> 6. Complete as many tasks as you can to reveal the background picture!</p>
		</div>
	);
};

export default HelpModal;
