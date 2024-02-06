import React, { useState, useEffect } from "react";

const Crossword = () => {
	const [grid, setGrid] = useState([]);
	const names = ["Alice", "Bob", "Charlie", "David", "Emily"]; // Add more names as needed

	useEffect(() => {
		// Generate the grid with random placement of names
		const randomGrid = Array(10)
			.fill(null)
			.map(() => Array(10).fill(""));

		const placedNames = [];
		for (const name of names) {
			const horizontal = Math.random() < 0.5;
			const startRow = Math.floor(Math.random() * 10);
			const startCol = Math.floor(Math.random() * (10 - name.length));

			if (
				canPlaceName(randomGrid, name, startRow, startCol, horizontal) &&
				!placedNames.includes(name)
			) {
				placeName(randomGrid, name, startRow, startCol, horizontal);
				placedNames.push(name);
			}
		}

		setGrid(randomGrid);
	}, []);

	const canPlaceName = (grid, name, row, col, horizontal) => {
		if (horizontal) {
			for (let i = 0; i < name.length; i++) {
				if (grid[row][col + i] !== "") return false;
			}
			return true;
		} else {
			for (let i = 0; i < name.length; i++) {
				if (grid[row + i][col] !== "") return false;
			}
			return true;
		}
	};

	const placeName = (grid, name, row, col, horizontal) => {
		if (horizontal) {
			for (let i = 0; i < name.length; i++) {
				grid[row][col + i] = name[i];
			}
		} else {
			for (let i = 0; i < name.length; i++) {
				grid[row + i][col] = name[i];
			}
		}
	};

	return (
		<div className='crossword-grid'>
			{grid.map((row, rowIndex) => (
				<div key={rowIndex} className='row'>
					{row.map((cell, colIndex) => (
						<div key={colIndex} className='cell'>
							{cell}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default Crossword;
