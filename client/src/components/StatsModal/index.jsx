import React, { useState, useEffect } from 'react'
import '../../assets/css/modal.css'

const StatsModal = ({ stats }) => {

	const statsData = stats;

	return (
		<div>
			<div className="modal-content">
				<div className="inventory-header">
					<h3>My Stats</h3> 
				</div>
				<div className="inventory-items">
					{statsData.map((stat, index) => (
						<div key={index}>
							<p>My username: {stat.username}</p>
							<p>My completed tasks: {stat.task_id}</p>
							<p>Task feedback: {stat.feedback}</p>
							<p>How long do I spend on the app?: {stat.total_time} mins</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default StatsModal;