const VocManager = require("../VocManager");
const Vocabulary = require("../Vocabulary")
const fs = require("fs");

const manager = new VocManager()
const outputDir = "out-test/"

// Create directory that will contain the output file
if (!fs.existsSync(outputDir)){
	fs.mkdirSync(outputDir);
}

test("Guarda nueva palabra en la 'BD' y esperar que sea la misma", () => {
	// Store a word
	manager.storeWord("Prueba", "noun", ["Intento de algo"]);

	var vocabulary = JSON.parse(fs.readFileSync("out-test/out-example.json"));
	expect(vocabulary).toEqual({word: "Prueba", type: "noun", description: ["Intento de algo"]});
});

test("Fallar al intentar guardar una palabra que no tiene un tipo correcto", () => {
	// Clear file
	fs.writeFileSync("out-test/out-example.json", "");

	// Try to store a word with a wrong type
	manager.storeWord("Prueba", "nombre", ["Intento de algo"]);
	var vocabulary = fs.readFile("out-test/out-example.json");
	expect(vocabulary).toBe(undefined);

});

test("Recuperar una palabra especifica de la 'BD'", () => {
	// Write a group of words in the 'database'
	fs.writeFileSync("out-test/out-example.json", JSON.stringify([
		{word: "Prueba", type: "noun", description: ["Intento de algo"]},
		{word: "Test", type: "noun", description: ["Prueba de un componente"]}
	]));

	var word = manager.getVocabularyByType("Test", "noun");
	expect(word).toEqual(new Vocabulary("Test", "noun", ["Prueba de un componente"]));
});

test("Recuperar un grupo de palabras de la 'BD' que tengan el mismo tipo", () => {
	// Write a bunch of words to the 'database'
	fs.writeFileSync("out-test/out-example.json", JSON.stringify([
		{word: "Prueba", type: "noun", description: ["Intento de algo"]},
		{word: "Test", type: "noun", description: ["Prueba de un componente"]},
		{word: "Comer", type: "verb", description: ["Ingerir alimentos para obtener nutrientes"]}
	]));

	var vocabulary = manager.getVocabularySameType("noun");
	expect(vocabulary.sort()).toEqual([
		{word: "Prueba", type: "noun", description: ["Intento de algo"]},
		{word: "Test", type: "noun", description: ["Prueba de un componente"]}
	].sort());
});

test("Recuperar una palabra de la 'BD' cuando se busca que todas tengan el mismo tipo", () => {
	// Write a bunch of words to the 'database'
	fs.writeFileSync("out-test/out-example.json", JSON.stringify([
		{word: "Prueba", type: "noun", description: ["Intento de algo"]},
		{word: "Test", type: "noun", description: ["Prueba de un componente"]},
		{word: "Comer", type: "verb", description: ["Ingerir alimentos para obtener nutrientes"]}
	]));

	var vocabulary = manager.getVocabularySameType("verb");
	expect(vocabulary).toEqual([{word: "Comer", type: "verb", description: ["Ingerir alimentos para obtener nutrientes"]}]);
});