import { useState } from "react";
import "./Body.css";

// Array to store all the words entered
var wordArray = [];
var wordIndex = 0;
const Body = () => {
	//Usestate that could detect change in the word input
	const [word, setWord] = useState("");
	// Usestate to set the grid size
	const [gridSize, setGridSize] = useState(5);

	// Function to create the crossword grid
	var crossword = [];
	for (let i = 0; i < gridSize; i++) {
		crossword.push([]);
		for (let j = 0; j < gridSize; j++) {
			crossword[i].push("");
		}
	}

	// Array to store the words that have been placed
	var wordsPlaced = [];

	const ArrangeWords = (wordArray, wordsPlaced) => {
		var placed = false;
		var word = wordArray[wordIndex];
		var wordLength = word.length;
		var empty = 0;

		// Loop through the wordArray
		// Iterate through the rows
		for (let row = 0; row < crossword.length && !placed; row++) {
			// Iterate through the columns
			for (
				let column = 0;
				column < crossword[row].length && !placed;
				column++
			) {
				if (crossword[row][column] === "") {
					empty++;
					if (empty === wordLength) {
						placed = true;
						wordIndex += 1;
						// Place the word horizontally
						for (let i = 0; i < wordLength; i++) {
							crossword[row][i] = word[i];
						}
						wordsPlaced.push(word);
						delete wordArray[0];
						console.log(crossword, wordsPlaced, wordArray);
					}
				}
			}
		}
	};
	const setGridSizeChange = (event) => {
		setGridSize(event.target.value);
	};

	//Function that could detect change in the word input
	const handleChange = (event) => {
		// Prevent input if it contains spaces
		if (event.target.value.includes(" ")) {
			event.target.value = event.target.value.replace(/\s/g, "");
			window.alert("Please don't press spacebar");
		}
		const newWord = event.target.value.trim();
		if (newWord.length > gridSize) {
			event.target.value = newWord.slice(0, 5);
			window.alert(
				`Please enter a word with maximum of ${gridSize} characters`
			);
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
			// Push the word to the wordArray
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

			const btns = document.querySelectorAll(".body-words");
			btns.forEach((btn) => btn.classList.add("bouncy"));
		}
	};

	// Function that triggers when Enter Key is pressed
	const keyPress = (event) => {
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
		// Sort the wordArray by length
		wordArray = wordArray.sort((a, b) => b.length - a.length);
		ArrangeWords(wordArray, wordsPlaced);
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
				<select
					className='body-select'
					id=''
					onChange={setGridSizeChange}
					value={gridSize}
				>
					<option value='5'>5x5</option>
					<option value='8'>8x8</option>
					<option value='10'>10x10</option>
				</select>
			</div>
			<div className='body-words' id='words'></div>
		</div>
	);
};
export default Body;
