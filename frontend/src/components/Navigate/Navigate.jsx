import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navigate.css";
const Navigate = () => {
	return (
		<div className='navigate'>
			<button className='navigate-btn'>
				<a href='/create' className="navigate-a">Create New Crossword </a>
			</button>
			<button className='navigate-btn'>
				<a href='/theme' className="navigate-a">Theme Based Crosswords</a>
			</button>
		</div>
	);
};

export default Navigate;
