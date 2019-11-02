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
		// Insert some more words into the manager
		beforeAll(() => {
			manager.addVocabulary("comer", "verb", ["Ingerir alimentos"]);
			manager.addVocabulary("beber", "verb", ["Ingerir líquidos"]);
		});
		
		test("Try to recover a piece of vocabulary with a non-valid type and except", () => {
			expect(() => {
				manager.getVocabularyWordType("Prueba", "nombre")
			}).toThrow(ValueError);
		});

		test("Try to recover a piece of vocabulary searching by a word not inserted and except", () => {
			expect(() => {
				manager.getVocabularyWordType("Intento", "noun")
			}).toThrow(NotFoundError);
		});

		test("Try to recover a piece of vocabulary searching by a different type than the one inserted with and except", () => {
			expect(() => {
				manager.getVocabularyWordType("comer", "noun");
			}).toThrow(NotFoundError);
		});

		test("Try to recover a non-existent piece of vocabulary", () => {
			expect(() => {
				manager.getVocabularyWordType("dormir", "verb")
			}).toThrow(NotFoundError);
		})

		test("Recover successfully a piece of vocabulary by the word and its type", () => {
			expect(() => {
				manager.getVocabularyWordType("comer", "verb");
			}).not.toThrow();
			expect(
				manager.getVocabularyWordType("comer", "verb")
			).toEqual(new Vocabulary("comer", "verb", ["Ingerir alimentos"]));
		});
	});
});
