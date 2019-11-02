const VocManager = require("../src/VocManager");
const Vocabulary = require("../src/Vocabulary");
const NotFoundError = require("../src/exceptions/NotFoundError");
const ValueError = require("../src/exceptions/ValueError");

const manager = new VocManager();

describe('Testing class API', () => {
	describe('Testing VocManager method addVocabulary()', () => {
		test("Try to add a piece of vocabulary with a non-valid type and except", () => {
			expect(() => {
				manager.addVocabulary("Prueba", "nombre", ["Intento de algo"])
			}).toThrow(ValueError);
		});
	
		test("Try to add a piece of vocabulary with a description which is not an Array and except", () => {
			expect(() => {
				manager.addVocabulary("Prueba", "noun", "Intento de algo")
			}).toThrow(TypeError);
		});
	
		test("Try to add a piece of vocabulary with a description which is an Array but each element isn't a string and except", () => {
			expect(() => {
				manager.addVocabulary("Prueba", "noun", ["Intento de algo", 1])
			}).toThrow(TypeError);
		});
	
		test("Add a new word to the vocabulary successfully", () => {
			expect(() => {
				manager.addVocabulary("Prueba", "noun", ["Intento de algo"])
			}).not.toThrow();
		});
	});
	
	describe('Testing VocManager method getVocabularyWordType()', () => {
		beforeAll(() => {
			manager.addVocabulary("Prueba", "nombre", ["Intento de algo"]);
			manager.addVocabulary("comer", "verb", ["Ingerir alimentos"]);
			manager.addVocabulary("beber", "verb", ["Ingerir líquidos"]);
		});
	});
});
