const VocManager = require("../VocManager");
const Vocabulary = require("../Vocabulary")
const fs = require("fs");

const manager = new VocManager()

test("Guarda nueva palabra en la 'BD' y esperar que sea la misma", () => {
	// Store a word
	manager.storeWord("Prueba", "noun", ["Intento de algo"]);

	// Read the word from the file
	var vocabulary = JSON.parse(fs.readFileSync("out-test/out-example.json"));

	// Check if it has the same value
	expect(vocabulary).toEqual({word: "Prueba", type: "noun", description: ["Intento de algo"]});
});

test("Fallar al intentar guardar una palabra que no tiene un tipo correcto", () => {
	// Clear file
	fs.writeFileSync("out-test/out-example.json", "");

	// Try to store a word with a wrong type
	manager.storeWord("Prueba", "nombre", ["Intento de algo"]);

	// Read the 'stored' file
	var vocabulary = fs.readFile("out-test/out-example.json");

	// Check that nothing has been stored
	expect(vocabulary).toBe(undefined);

});

test("Recuperar una palabra especifica de la 'BD'", () => {
	// Write a group of words in the 'database'
	fs.writeFileSync("out-test/out-example.json", JSON.stringify([
		{word: "Prueba", type: "noun", description: ["Intento de algo"]},
		{word: "Test", type: "noun", description: ["Prueba de un componente"]}
	]));

	// Retrieve the word
	var word = manager.getVocabularyByType("Test", "noun");

	// Check if it has the same value
	expect(word).toEqual(new Vocabulary("Test", "noun", ["Prueba de un componente"]));
});

test("Recuperar un grupo de palabras de la 'BD' que tengan el mismo tipo", () => {
	// Write a bunch of words to the 'database
	fs.writeFileSync("out-test/out-example.json", JSON.stringify([
		{word: "Prueba", type: "noun", description: ["Intento de algo"]},
		{word: "Test", type: "noun", description: ["Prueba de un componente"]},
		{word: "Comer", type: "verb", description: ["Ingerir alimentos para obtener nutrientes"]}
	]));

	// Retrieve a group of words
	var vocabulary = manager.getVocabularySameType("noun");

	// Check if the response is the expected
	expect(vocabulary.sort()).toEqual([
		{word: "Prueba", type: "noun", description: ["Intento de algo"]},
		{word: "Test", type: "noun", description: ["Prueba de un componente"]}
	].sort());
});

test("Recuperar una palabra de la 'BD' cuando se busca que todas tengan el mismo tipo", () => {
	// Write a bunch of words to the 'database
	fs.writeFileSync("out-test/out-example.json", JSON.stringify([
		{word: "Prueba", type: "noun", description: ["Intento de algo"]},
		{word: "Test", type: "noun", description: ["Prueba de un componente"]},
		{word: "Comer", type: "verb", description: ["Ingerir alimentos para obtener nutrientes"]}
	]));

	// Retrieve a words of the specified type
	var vocabulary = manager.getVocabularySameType("verb");

	// Check if the response is the expected
	expect(vocabulary).toEqual([{word: "Comer", type: "verb", description: ["Ingerir alimentos para obtener nutrientes"]}]);
});