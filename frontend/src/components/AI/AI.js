const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyCGKc_57FG8aPuJeW3tffyiTxzqeNL2u1o");

const words = 5
const theme = "buildings"
const prompt = `Give me ${words} of ${theme}, the length of each word should be less than 6.`;

const schema = {
    description: "List of words",
    type: SchemaType.ARRAY,
    items: {
        type: SchemaType.OBJECT,
        properties: {
            word: {
                type: SchemaType.STRING,
                description: prompt,
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
    }
});


async function generateContent() {
    try {
        const result = await model.generateContent(prompt);
        // Assuming result.response is an object with a promise returning `text()`
        const text = await result.response.text();
        console.log(text);
    } catch (error) {
        console.error("Error generating content:", error);
    }
}

generateContent();