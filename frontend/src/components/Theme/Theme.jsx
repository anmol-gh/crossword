import React from "react";
import "./Theme.css";
import { useState } from "react";
import Crossword from "../Crossword/Crossword";
import themeWords from "./theme-words.js";
const displayCrossword = (grid) => {
	var tableDiv = document.getElementsByClassName("crossword-container")[0];
	var table = tableDiv.getElementsByTagName("table")[0];
	var tableRows = table.getElementsByTagName("tr");
	for (var row = 0; row < 10; row++) {
		var tableRow = tableRows[row];
		for (var column = 0; column < 10; column++) {
			var tableData = tableRow.getElementsByTagName("td")[column];
			if (grid[row][column] === "") {
				tableData.innerHTML = "&nbsp;";
			} else {
				tableData.innerHTML = grid[row][column];
			}
		}
	}
};

const Theme = () => {
	var wordArray = [];
	// UseState to select and declare the crossword theme
	const [Theme, SetTheme] = useState("Animals");
	const selectChange = (e) => {
		SetTheme(e.target.value);
	};
	// UseState to select and declare number of words in the crossword.
	const [Number, SetNumber] = useState("4");
	const selectNumberChange = (e) => {
		SetNumber(e.target.value);
	};

	// Function to display the words
	const DisplayWords = (wordArray) => {
		// document.
		console.log(wordArray);
		let area = document.getElementById("theme-words");
		console.log(area);
		// area = newElement;
		area.innerHTML = '';
		for (let i = 0; i < wordArray.length; i++) {
			const childElement = document.createElement("div");
			childElement.classList.add("body-word");
			childElement.textContent = wordArray[i];
			area.appendChild(childElement);
		}
	};
	const ArrangeWords = (wordArray) => {
		const grid = Array.from({ length: 10 }, () =>
			Array.from({ length: 10 }, () => "")
		);
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
			placedWords.push({
				word: word,
				row: row,
				column: column,
				direction: "horizontal",
			});
		};

		// Function to place a word vertically at a given position
		const placeWordVertically = (word, row, column) => {
			for (let i = 0; i < word.length; i++) {
				grid[row + i][column] = word[i];
			}
			placedWords.push({
				word: word,
				row: row,
				column: column,
				direction: "vertical",
			});
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
						placed = true;
					}
				}
			}
		};

		placeWords();
		const characters = [
			"A",
			"B",
			"C",
			"D",
			"E",
			"F",
			"G",
			"H",
			"I",
			"J",
			"K",
			"L",
			"M",
			"N",
			"O",
			"P",
			"Q",
			"R",
			"S",
			"T",
			"U",
			"V",
			"W",
			"X",
			"Y",
			"Z",
		];

		for (let row = 0; row < 10; row++) {
			for (let column = 0; column < 10; column++) {
				const randomLetter =
					characters[Math.floor(Math.random() * characters.length)];
				if (grid[row][column] === "") {
					grid[row][column] = randomLetter;
				}
			}
		}
		displayCrossword(grid);
		return placedWords;
	};

	//Function that triggers when Create Crossword button is clicked

	const handleCreateCrossword = () => {
		while (wordArray.length < Number) {
			// pick a random index
			const randomIndex = Math.floor(Math.random() * themeWords[Theme].length);
			// get the element at that index
			const randomElement = themeWords[Theme][randomIndex];
			if (!wordArray.includes(randomElement)) {
				// ensure the element is unique
				wordArray.push(randomElement); // add to new array
			}
		}
		console.log(wordArray);
		DisplayWords(wordArray);

		// Sort the wordArray by length
		wordArray = wordArray.sort((a, b) => b.length - a.length);

		// ArrangeWords(wordArray, wordsPlaced);
		ArrangeWords(wordArray);
	};
	return (
		<>
			<div className='theme-container'>
				<div className='theme-first-row'>
					<div className='theme-dropdown'>
						<select
							name='Select Theme'
							id='theme'
							className='theme-select'
							onChange={selectChange}
						>
							<option value='Animals' className='searchbar-option'>
								Animals
							</option>
							<option value='Birds' className='searchbar-option'>
								Birds
							</option>
							<option value='Fruits' className='searchbar-option'>
								Fruits
							</option>
							<option value='Vegetables' className='searchbar-option'>
								Vegetables
							</option>
							<option value='Jobs' className='searchbar-option'>
								Jobs
							</option>
							<option value='Vehicles' className='searchbar-option'>
								Vehicles
							</option>
							<option value='Jobs' className='searchbar-option'>
								Jobs
							</option>
							<option value='Musical Instruments' className='searchbar-option'>
								Musical Instruments
							</option>
							<option value='Sports' className='searchbar-option'>
								Sports
							</option>
						</select>
					</div>

					<div className='word-dropdown '>
						<select
							name='Select Words'
							id='numbers'
							className='theme-select'
							onChange={selectNumberChange}
						>
							<option value='4' className='searchbar-option'>
								4
							</option>
							<option value='5' className='searchbar-option'>
								5
							</option>
							<option value='6' className='searchbar-option'>
								6
							</option>
						</select>
					</div>
					<button onClick={handleCreateCrossword} className='theme-btn'>
						Create Crossword
					</button>
				</div>
				<div className='body-words bouncy' id='theme-words'></div>
				<Crossword />
			</div>
		</>
	);
};

export default Theme;
