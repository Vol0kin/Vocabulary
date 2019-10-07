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
	expect(word).toEqual(new Vocabulary("Test", "sustantivo", ["Prueba de un componente"]));
});

test("Recuperar un grupo de palabras de la 'BD' que tengan el mismo tipo", () => {
	// Write a bunch of words to the 'database
	fs.writeFileSync("out-test/out-example.json", JSON.stringify([
		{word: "Prueba", type: "sustantivo", description: ["Intento de algo"]},
		{word: "Test", type: "sustantivo", description: ["Prueba de un componente"]},
		{word: "Comer", type: "verbo", description: ["Ingerir alimentos para obtener nutrientes"]}
	]));

	// Retrieve a group of words
	var vocabulary = manager.getWordsSameType("sustantivo");

	// Check if the response is the expected
	expect(vocabulary.sort()).toEqual([
		{word: "Prueba", type: "sustantivo", description: ["Intento de algo"]},
		{word: "Test", type: "sustantivo", description: ["Prueba de un componente"]}
	].sort());
});

test("Recuperar una palabra de la 'BD' cuando se busca que todas tengan el mismo tipo", () => {
	// Write a bunch of words to the 'database
	fs.writeFileSync("out-test/out-example.json", JSON.stringify([
		{word: "Prueba", type: "sustantivo", description: ["Intento de algo"]},
		{word: "Test", type: "sustantivo", description: ["Prueba de un componente"]},
		{word: "Comer", type: "verbo", description: ["Ingerir alimentos para obtener nutrientes"]}
	]));

	// Retrieve a words of the specified type
	var vocabulary = manager.getWordsSameType("verbo");

	// Check if the response is the expected
	expect(vocabulary).toEqual({word: "Comer", type: "verbo", description: ["Ingerir alimentos para obtener nutrientes"]});
});