import "./Body.css";
import { useState } from "react";

// Array that stores all the words
const wordArray = [];

const Body = () => {
	//Usestate that could detect change in the word input
	const [word, setWord] = useState("");

	//Function that could detect change in the word input
	const handleChange = (event) => {
		// Prevent input if it contains spaces
		if (event.target.value.includes(" ")) {
			event.target.value = event.target.value.replace(/\s/g, "");
		}
		setWord(event.target.value);
	};
	
	//Function that triggers when Add Word button is clicked

	const handleClick = () => {
		// appends the word to the div
		if (word === "") {
			window.alert("Please enter a word");
			return;
		} else {
			const words = document.getElementById("words");
			const value = wordArray.includes(word.toUpperCase());
			if (value === true) {
				window.alert(`Word ${word} already exists`);
				return;
			}
			console.log(value);
			wordArray.push(word.toUpperCase());
			console.log(wordArray);

			// Create a new div element
			const newDiv = document.createElement("div");
			newDiv.textContent = word.toUpperCase();
			newDiv.className = "body-word";
			// Append the new div to the words container
			words.appendChild(newDiv);
			// Clear the state
			const inputField = document.querySelector(".body-input");
			inputField.value = "";
		}
	};

	// Function that triggers when Enter Key is pressed
	const keyPress = (event) => {
		console.log(event.key);
		if (event.key === "Enter") {
			handleClick();
		}
	};
	//Function that triggers when Create Crossword button is clicked

	const handleCreateCrossword = () => {
		if (wordArray.length < 3) {
			window.alert("Please enter at least 3 words");
			return;
		}
	};

	return (
		<div className='body-container'>
			<div className='body-first-row'>
				<input
					type='text'
					className='body-input'
					placeholder='Enter a word'
					onChange={handleChange}
					onKeyDown={keyPress}
				></input>
				<button className='body-btn' onClick={handleClick}>
					Add Word
				</button>
				<button className='body-btn-create' onClick={handleCreateCrossword}>
					Create Crossword
				</button>
			</div>
			{/* div that will contain the words */}
			<div className='body-words' id='words'></div>
		</div>
	);
};

export default Body;
