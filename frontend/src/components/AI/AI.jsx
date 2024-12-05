import React from "react";
import { useState } from "react";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const AI = () => {
	const [Number, SetNumber] = useState("4");
	const selectNumberChange = (e) => {
		SetNumber(e.target.value);
	};
	const genAI = new GoogleGenerativeAI(process.env.API_KEY);

	
	const schema = {
		description: "List of words",
		type: SchemaType.ARRAY,
		items: {
			type: SchemaType.OBJECT,
			properties: {
				word: {
					type: SchemaType.STRING,
					// description: None,
					nullable: false,
				},
			},
			required: ["word"],
		},
	};

	const model = genAI.getGenerativeModel({
		model: "gemini-1.5-flash",
		generationConfig: {
			responseMimeType: "application/json",
			responseSchema: schema,
		},
	});

	async function generateContent(prompt) {
		try {
			const result = await model.generateContent(prompt);
			// Assuming result.response is an object with a promise returning `text()`
			const text = await result.response.text();
			console.log(text);
		} catch (error) {
			console.error("Error generating content:", error);
		}
	}
	

	var wordArray = [];

	const DisplayWords = (wordArray) => {
		// document.
		console.log(wordArray);
		let area = document.getElementById("theme-words");
		console.log(area);
		// area = newElement;
		area.innerHTML = "";
		for (let i = 0; i < wordArray.length; i++) {
			const childElement = document.createElement("div");
			childElement.classList.add("body-word");
			childElement.textContent = wordArray[i];
			area.appendChild(childElement);
		}
	};

	const handleCreateCrossword = () => {
		console.log("clicked");
		DisplayWords(wordArray);
		const text = document.getElementById("textbox")
		console.log(text.value)
		// Sort the wordArray by length
		wordArray = wordArray.sort((a, b) => b.length - a.length);
		const theme = text.value;
		const prompt = `Give me ${Number} of ${theme}, the length of each word should be less than 15.`;
		generateContent(prompt);
		// ArrangeWords(wordArray, wordsPlaced);
		// ArrangeWords(wordArray);
	};

	return (
		<div className='body-container'>
			<div className='body-first-row'>
				<input placeholder = "Enter the theme you want" id = "textbox"></input>
				<div className='theme-dropdown'>
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
					<button onClick={handleCreateCrossword} className='theme-btn'>
						Create Crossword
					</button>
				</div>
			</div>
					<div className='body-words bouncy' id='theme-words'></div>
		</div>
	);
};

export default AI;

//useState for input
// input goes as prompt
// output received from AI goes as Input to generateCrossword()
