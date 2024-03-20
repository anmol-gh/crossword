import "./Body.css";
import { useState } from "react";

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

	const ArrangeWords = (wordArray) => {
		const grid = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ""));
		const placedWords = [];
	
		// Function to check if a word can be placed horizontally at a given position
		const canPlaceHorizontally = (word, row, column) => {
			if (column + word.length > 10) return false; // Check if word exceeds grid width
			for (let i = 0; i < word.length; i++) {
				if (grid[row][column + i] !== "" && grid[row][column + i] !== word[i]) {
					return false; // Check if there's a conflicting letter
				}
			}
			return true;
		};
	
		// Function to check if a word can be placed vertically at a given position
		const canPlaceVertically = (word, row, column) => {
			if (row + word.length > 10) return false; // Check if word exceeds grid height
			for (let i = 0; i < word.length; i++) {
				if (grid[row + i][column] !== "" && grid[row + i][column] !== word[i]) {
					return false; // Check if there's a conflicting letter
				}
			}
			return true;
		};
	
		// Function to place a word horizontally at a given position
		const placeWordHorizontally = (word, row, column) => {
			for (let i = 0; i < word.length; i++) {
				grid[row][column + i] = word[i];
			}
			placedWords.push({ word: word, row: row, column: column, direction: "horizontal" });
		};
	
		// Function to place a word vertically at a given position
		const placeWordVertically = (word, row, column) => {
			for (let i = 0; i < word.length; i++) {
				grid[row + i][column] = word[i];
			}
			placedWords.push({ word: word, row: row, column: column, direction: "vertical" });
		};
	
		// Function to place all words in the grid
		const placeWords = () => {
			for (const word of wordArray) {
				let placed = false;
				while (!placed) {
					const row = Math.floor(Math.random() * 10);
					const column = Math.floor(Math.random() * 10);
					if (canPlaceHorizontally(word, row, column)) {
						placeWordHorizontally(word, row, column);
						placed = true;
					} else if (canPlaceVertically(word, row, column)) {
						placeWordVertically(word, row, column);
	const placeVertical = (word, crossword, row, column) => {
		console.log("PlaceVertical");
	};
	const placeHorizontal = (word, crossword, row, column) => {
		console.log("PlaceHorizontal");
	};

	const ArrangeWords = (wordArray, wordIndex, crossword) => {
		var placed = false;
		while (wordIndex < wordArray.length) {
			console.log("inside arrange words");
			const word = wordArray[wordIndex];
			const firstLetter = word[0];
			for (let row = 0; row < crossword.length && !placed; row++) {
				// Iterate through the columns
				for (
					let column = 0;
					column < crossword[row].length && !placed;
					column++
				) {
					if (crossword[row][column] === firstLetter) {
						placeVertical(word, crossword, row, column);
						placeHorizontal(wordArray, wordIndex, crossword, row, column);
					}
				}
			}
		}
	};

	const ArrangeFirstWord = (wordArray, wordsPlaced) => {
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
					}
				}
			}
		};
	
		placeWords();
		console.log(grid);
		return placedWords;
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
		ArrangeWords(wordArray, wordIndex, crossword);
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
		ArrangeFirstWord(wordArray, wordsPlaced);
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
					onChange={setGridSize}
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
