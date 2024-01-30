import "./Body.css";
import { useState } from "react";

const Body = () => {
	//Usestate that could detect change in the word input
	const [word, setWord] = useState("");

	//Function that could detect change in the word input
	const handleChange = (event) => {
		setWord(event.target.value);
	};

	//Function that triggers when button is clicked
	const handleClick = () => {
		// appends the word to the div
		const words = document.getElementById("words");

		// Create a new div element
		const newDiv = document.createElement("div");
		newDiv.textContent = word;
		newDiv.className = "body-word";
		// Append the new div to the words container
		words.appendChild(newDiv);
	};

	return (
		<div className='body-container'>
			<div className='body-first-row'>
				<input
					className='body-input'
					placeholder='Enter a word'
					onChange={handleChange}
				></input>
				<button className='body-btn' onClick={handleClick}>
					Add Word
				</button>
			</div>
			{/* div that will contain the words */}
			<div className='body-words' id='words'></div>
		</div>
	);
};

export default Body;
