import React from "react";
import "./Theme.css";
import { useState } from "react";
import Crossword from "../Crossword/Crossword";
import themeWords from "./theme-words.js";
const displayCrossword = (grid) => {
	var tableDiv = document.getElementsByClassName("crossword-container")[0];
	var table = tableDiv.getElementsByTagName("table")[0];
	console.log(table);
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
	const [word, setWord] = useState("");
	// UseState to select and declare the crossword theme
	const [Theme, SetTheme] = useState("");
	// UseState to select and declare number of words in the crossword.
	const [Number, SetNumber] = useState("3");
	const selectChange = (e) => {
		SetTheme(e.target.value);
		console.log(Theme);
		console.log(themeWords[e.target.value]);
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
		console.log(grid);
		displayCrossword(grid);
		return placedWords;
	};

	//Function that triggers when Create Crossword button is clicked

	const handleCreateCrossword = () => {
		console.log(wordArray);
		while (wordArray.length < 5) {
			const randomIndex = Math.floor(Math.random() * themeWords[Theme].length); // pick a random index
			const randomElement = themeWords[Theme][randomIndex]; // get the element at that index

			if (!wordArray.includes(randomElement)) {
				// ensure the element is unique
				wordArray.push(randomElement); // add to new array
			}
		}
		console.log(wordArray, "Selected");
		// Sort the wordArray by length
		wordArray = wordArray.sort((a, b) => b.length - a.length);
		console.log(wordArray, "sorted");

		// ArrangeWords(wordArray, wordsPlaced);
		ArrangeWords(wordArray);
	};
	return (
		<>
			<div className='theme-container'>
				<div className='theme-first-row'>
					<div className='theme-dropdown'>
						<select
							name='Filter by Region'
							id='region'
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
						</select>
						<button onClick={handleCreateCrossword} className='theme-btn'>
							Create Crossword
						</button>
					</div>
				</div>
				<Crossword />
			</div>
		</>
	);
};

export default Theme;
