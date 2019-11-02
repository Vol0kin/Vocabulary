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
	
	describe("Testing VocManager method getVocabularyWordType()", () => {

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

		test("Try to recover a non-existent piece of vocabulary and except", () => {
			expect(() => {
				manager.getVocabularyWordType("dormir", "verb")
			}).toThrow(NotFoundError);
		})

		test("Recover successfully a piece of vocabulary by the word and its type and check its class and values", () => {
			expect(() => {
				manager.getVocabularyWordType("comer", "verb");
			}).not.toThrow();

			const voc = manager.getVocabularyWordType("comer", "verb");

			expect(voc).toBeInstanceOf(Vocabulary);
			expect(voc).toEqual(new Vocabulary("comer", "verb", ["Ingerir alimentos"]));
		});
	});

	describe("Testing VocManager method getVocabularyType()", () => {

		test("Try to recover a bunch of vocabulary with a non-valid type and except", () => {
			expect(() => {
				manager.getVocabularyType("nombre");
			}).toThrow(ValueError);
		});

		test("Try to recover a bunch of vocabulary by a type which has no elemnts associated to it and except", () => {
			expect(() => {
				manager.getVocabularyType("adjective");
			}).toThrow(NotFoundError);
		});

		test("Recover successfully a bunch of vocabulary by a given type and check that it's an Array with only one item", () => {
			expect(() => {
				manager.getVocabularyType("noun");
			}).not.toThrow();

			const vocList = manager.getVocabularyType("noun");

			expect(vocList).toBeInstanceOf(Array);
			expect(vocList).toHaveLength(1);
		});

		test("Recover successfully a bunch of vocabulary by a given type and check that it's an Array with more than one item", () => {
			expect(() => {
				manager.getVocabularyType("verb");
			}).not.toThrow();

			const vocList = manager.getVocabularyType("verb");

			expect(vocList).toBeInstanceOf(Array);
			expect(vocList).toHaveLength(2);
		})
	});
});
