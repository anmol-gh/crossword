import React from "react";
import { useState } from "react";
import Body from "../Body/Body";
import Crossword from "../Crossword/Crossword";
import Help from "../Help/Help";
import Theme from "../Theme/Theme";
import AI from "../AI/AI.jsx";
import "./Navigate.css";
const Navigate = () => {
	const [activeComponent, setActiveComponent] = useState("User");

	const handleButtonClick = (componentName) => {
		setActiveComponent(componentName);
	};
	return (
		<div className='navigate-container'>
			<div className='nav-container-one'>
				<button
					className='navigate-btn'
					onClick={() => handleButtonClick("User")}
				>
					User Based Crossword{" "}
				</button>
				<button
					className='navigate-btn'
					onClick={() => handleButtonClick("Theme")}
				>
					Theme Based Crossword
				</button>
				<button
					className='navigate-btn'
					onClick={() => handleButtonClick("AI")}
				>
					Create using AI
				</button>
				<button
					className='navigate-btn'
					onClick={() => handleButtonClick("How")}
				>
					{" "}
					How to use Crosswordy
				</button>
			</div>
			<div className='nav-container-two'>
				{/* <Body />
				<Crossword /> */}
				{activeComponent === "User" && (
					<>
						<Body />
						<Crossword />
					</>
				)}
				{activeComponent === "Theme" && <Theme />}
				{activeComponent === "How" && <Help />}
				{activeComponent === "AI" && <AI></AI>}
			</div>
		</div>
	);
};

export default Navigate;
