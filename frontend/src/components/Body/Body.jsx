import "./Body.css";
import { useState } from "react";

// Array that stores all the words
var gridSize = 10;
var wordArray = [];
var maxLength = 0;
var largestWord = "";
var wordsPlaced = [];
var crossword = [];
for (let i = 0; i < gridSize; i++) {
	crossword.push([]);
	for (let j = 0; j < gridSize; j++) {
		crossword[i].push("");
	}
}
console.log(crossword);

// const crossword = [
// 	["", "", "", "", "", "", "", "", "", ""],
// 	["", "", "", "", "", "", "", "", "", ""],
// 	["", "", "", "", "", "", "", "", "", ""],
// 	["", "", "", "", "", "", "", "", "", ""],
// 	["", "", "", "", "", "", "", "", "", ""],
// 	["", "", "", "", "", "", "", "", "", ""],
// 	["", "", "", "", "", "", "", "", "", ""],
// 	["", "", "", "", "", "", "", "", "", ""],
// 	["", "", "", "", "", "", "", "", "", ""],
// 	["", "", "", "", "", "", "", "", "", ""],
// ];

const ArrangeWords = (wordArray, wordsPlaced) => {
	console.log(wordArray);
	var placed = false;
	var word = wordArray[0];
	var wordLength = word.length;
	var empty = 0;
	// Sort the wordArray by length
	// Loop through the wordArray
	for (let row = 0; row < crossword.length && !placed; row++) {
		for (let column = 0; column < crossword[row].length && !placed; column++) {
			if (crossword[row][column] === "") {
				empty++;
				if (empty === wordLength) {
					placed = true;
					// Place the word horizontally
					for (let i = 0; i < wordLength; i++) {
						crossword[row][i] = word[i];
					}
					wordsPlaced.push(word);
					// wordArray.remove(word);
					console.log(crossword);
				}
			}
		}
	}
};

const Body = () => {
	//Usestate that could detect change in the word input
	const [word, setWord] = useState("");

	//Function that could detect change in the word input
	const handleChange = (event) => {
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
			// Push the word to the wordArray and checks the largest word
			if (word.length > maxLength) {
				maxLength = word.length;
				largestWord = word;
			}
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
				<select className='body-select'>
					<option>5x5</option>
					<option>8x8</option>
					<option>10x10</option>
				</select>
			</div>
			{/* div that will contain the words */}
			<div className='body-words' id='words'></div>
		</div>
	);
};

export default Body;
