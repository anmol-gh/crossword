import React, { useState } from "react";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const AI = () => {
  const [wordCount, setWordCount] = useState("4");
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wordArray, setWordArray] = useState([]); // State to store generated words

  // Initialize Google Generative AI
  const genAI = new GoogleGenerativeAI(
    process.env.REACT_APP_API || "AIzaSyCGKc_57FG8aPuJeW3tffyiTxzqeNL2u1o"
  );

  const schema = {
    description: "List of words",
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        word: {
          type: SchemaType.STRING,
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

  // Helper function to extract words and convert them to uppercase
  const extractWords = (words) => {
    return words.map((item) => item.word.toUpperCase()); // Convert to uppercase
  };

  // Function to generate words using AI
  const generateContent = async (prompt) => {
    setLoading(true);
    setError(null);
    try {
      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      const generatedWords = extractWords(JSON.parse(text));
      setWordArray(generatedWords); // Save the generated words in uppercase
      displayWords(generatedWords); // Display words in uppercase on the screen
      arrangeWords(generatedWords); // Call crossword arrangement function
    } catch (error) {
      console.error("Error generating content:", error);
      setError("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to display words
  const displayWords = (words) => {
    const area = document.getElementById("theme-words");
    area.innerHTML = ""; // Clear previous words
    words.forEach((word) => {
      const childElement = document.createElement("div");
      childElement.classList.add("body-word");
      childElement.textContent = word; // Display the word in uppercase
      area.appendChild(childElement);
    });
  };

  // Function to arrange words into a crossword grid
  const arrangeWords = (words) => {
    const grid = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ""));
    const placedWords = [];

    const canPlaceHorizontally = (word, row, column) => {
      if (column + word.length > 10) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row][column + i] !== "" && grid[row][column + i] !== word[i]) {
          return false;
        }
      }
      return true;
    };

    const canPlaceVertically = (word, row, column) => {
      if (row + word.length > 10) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][column] !== "" && grid[row + i][column] !== word[i]) {
          return false;
        }
      }
      return true;
    };

    const placeWordHorizontally = (word, row, column) => {
      for (let i = 0; i < word.length; i++) {
        grid[row][column + i] = word[i];
      }
      placedWords.push({ word, row, column, direction: "horizontal" });
    };

    const placeWordVertically = (word, row, column) => {
      for (let i = 0; i < word.length; i++) {
        grid[row + i][column] = word[i];
      }
      placedWords.push({ word, row, column, direction: "vertical" });
    };

    const placeWords = () => {
      for (const word of words) {
        let placed = false;
        while (!placed) {
          const row = Math.floor(Math.random() * 10);
          const column = Math.floor(Math.random() * 10);
          const isHorizontal = Math.random() < 0.5; // Randomly decide whether to place horizontally or vertically

          if (isHorizontal && canPlaceHorizontally(word, row, column)) {
            placeWordHorizontally(word, row, column);
            placed = true;
          } else if (!isHorizontal && canPlaceVertically(word, row, column)) {
            placeWordVertically(word, row, column);
            placed = true;
          }
        }
      }
    };

    placeWords();

    // Fill in empty spots with random letters
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    for (let row = 0; row < 10; row++) {
      for (let column = 0; column < 10; column++) {
        if (grid[row][column] === "") {
          grid[row][column] = characters[Math.floor(Math.random() * characters.length)];
        }
      }
    }

    displayCrossword(grid); // Display the crossword grid
  };

  // Function to display the crossword grid
  const displayCrossword = (grid) => {
    const tableDiv = document.getElementsByClassName("crossword-container")[0];
    const table = tableDiv.getElementsByTagName("table")[0];
    const tableRows = table.getElementsByTagName("tr");

    for (let row = 0; row < 10; row++) {
      const tableRow = tableRows[row];
      for (let column = 0; column < 10; column++) {
        const tableData = tableRow.getElementsByTagName("td")[column];
        tableData.innerHTML = grid[row][column]; // Show letters in grid
      }
    }
  };

  const handleCreateCrossword = () => {
    if (!theme.trim()) {
      setError("Please enter a theme.");
      return;
    }
    const prompt = `Generate ${wordCount} words related to the theme "${theme}", each word being less than 15 characters long.`;
    generateContent(prompt);
  };

  return (
    <div className="body-container">
      <div className="body-first-row">
        <input
          placeholder="Enter the theme you want"
          id="textbox"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />
        <div className="theme-dropdown">
          <select
            name="Select Words"
            id="numbers"
            className="theme-select"
            onChange={(e) => setWordCount(e.target.value)}
          >
            <option value="4" className="searchbar-option">4</option>
            <option value="5" className="searchbar-option">5</option>
            <option value="6" className="searchbar-option">6</option>
          </select>
          <button onClick={handleCreateCrossword} className="theme-btn">
            {loading ? "Loading..." : "Create Crossword"}
          </button>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="body-words bouncy" id="theme-words"></div>
      <div className="crossword-container">
        <table>
          <tbody>
            {Array.from({ length: 10 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: 10 }).map((_, colIndex) => (
                  <td key={colIndex}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AI;
