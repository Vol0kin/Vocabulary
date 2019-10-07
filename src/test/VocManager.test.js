const VocManager = require("../VocManager");
const Vocabulary = require("../Vocabulary")
const fs = require("fs");

const manager = new VocManager()

test("Guarda nueva palabra en la 'BD' y esperar que sea la misma", () => {
	// Store a word
	manager.storeWord("Prueba", "sustantivo", ["Intento de algo"]);

	// Read the word from the file
	var obj = JSON.parse(fs.readFileSync("out-test/out-example.json"));

	// Check if it has the same value
	expect(obj).toEqual({word: "Prueba", type: "sustantivo", description: ["Intento de algo"]});
});

test("Recuperar una palabra especifica de la 'BD'", () => {
	// Write a group of words in the 'database'
	fs.writeFileSync("out-test/out-example.json", JSON.stringify([
		{word: "Prueba", type: "sustantivo", description: ["Intento de algo"]},
		{word: "Test", type: "sustantivo", description: ["Prueba de un componente"]}
	]));

	// Retrieve the word
	var word = manager.getWordByType("Test", "sustantivo");

	// Check if it has the same value
	expect(word).toEqual(new Vocabulary("Test", "sustantivo", ["Prueba de un componente"]))
});