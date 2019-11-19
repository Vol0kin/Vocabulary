const Vocabulary = require("../src/Vocabulary");
const Word = require("../src/Word");
const NotFoundError = require("../src/exceptions/NotFoundError");
const ValueError = require("../src/exceptions/ValueError");

describe("Testing class API", () => {

	const vocabulary = new Vocabulary();

	describe("Testing Vocvocabulary's method addVocabulary()", () => {

		test("Try to add a piece of vocabulary passing a non-valid type and except", () => {
			expect(() => {
				vocabulary.addVocabulary("Prueba", "nombre", ["Intento de algo"]);
			}).toThrow(ValueError);
		});
	
		test("Try to add a piece of vocabulary passing a description which is not an Array and except", () => {
			expect(() => {
				vocabulary.addVocabulary("Prueba", "noun", "Intento de algo");
			}).toThrow(TypeError);
		});
	
		test("Try to add a piece of vocabulary passing a description which is an Array but not all elements are string and except", () => {
			expect(() => {
				vocabulary.addVocabulary("Prueba", "noun", ["Intento de algo", 1]);
			}).toThrow(TypeError);
		});
	
		test("Add a new word to the vocabulary successfully", () => {
			expect(() => {
				vocabulary.addVocabulary("Prueba", "noun", ["Intento de algo"]);
			}).not.toThrow();
		});
	});
	
	describe("Testing Vocvocabulary's method getVocabularyWordType()", () => {

		// Insert some more words
		beforeAll(() => {
			vocabulary.addVocabulary("comer", "verb", ["Ingerir alimentos"]);
			vocabulary.addVocabulary("beber", "verb", ["Ingerir líquidos"]);
		});
		
		test("Try to recover a piece of vocabulary passing a non-valid type and except", () => {
			expect(() => {
				vocabulary.getVocabularyWordType("Prueba", "nombre");
			}).toThrow(ValueError);
		});

		test("Try to recover a piece of vocabulary searching by a word not inserted and except", () => {
			expect(() => {
				vocabulary.getVocabularyWordType("Intento", "noun");
			}).toThrow(NotFoundError);
		});

		test("Try to recover a piece of vocabulary searching by a different type than the one inserted with and except", () => {
			expect(() => {
				vocabulary.getVocabularyWordType("comer", "noun");
			}).toThrow(NotFoundError);
		});

		test("Try to recover a non-existent piece of vocabulary and except", () => {
			expect(() => {
				vocabulary.getVocabularyWordType("dormir", "verb");
			}).toThrow(NotFoundError);
		});

		test("Recover successfully a piece of vocabulary by the word and its type and check its class and values", () => {
			expect(() => {
				vocabulary.getVocabularyWordType("comer", "verb");
			}).not.toThrow();

			const voc = vocabulary.getVocabularyWordType("comer", "verb");

			expect(voc).toBeInstanceOf(Word);
			expect(voc).toEqual(new Word("comer", "verb", ["Ingerir alimentos"]));
		});
	});

	describe("Testing Vocvocabulary's method getVocabularyType()", () => {

		test("Try to recover a bunch of vocabulary passing a non-valid type and except", () => {
			expect(() => {
				vocabulary.getVocabularyType("nombre");
			}).toThrow(ValueError);
		});

		test("Try to recover a bunch of vocabulary by a type which has no elemnts associated to it and except", () => {
			expect(() => {
				vocabulary.getVocabularyType("adjective");
			}).toThrow(NotFoundError);
		});

		test("Recover successfully a bunch of vocabulary by a given type and check that it's an Array with only one item", () => {
			expect(() => {
				vocabulary.getVocabularyType("noun");
			}).not.toThrow();

			const vocList = vocabulary.getVocabularyType("noun");

			expect(vocList).toBeInstanceOf(Array);
			expect(vocList).toHaveLength(1);
		});

		test("Recover successfully a bunch of vocabulary by a given type and check that it's an Array with more than one item", () => {
			expect(() => {
				vocabulary.getVocabularyType("verb");
			}).not.toThrow();

			const vocList = vocabulary.getVocabularyType("verb");

			expect(vocList).toBeInstanceOf(Array);
			expect(vocList.length).toBeGreaterThan(1);
		});
	});

	describe("Testing Vocvocabulary's method modifyDescription()", () => {

		test("Try to modify the description of a piece of vocabulary passing a non-existent type and except", () => {
			expect(() => {
				vocabulary.modifyDescription("Prueba", "nombre", ["Esto es una prueba"]);
			}).toThrow(ValueError);
		});

		test("Try to modify the description of a piece of vocabulary passing a non-Array object as description and except", () => {
			expect(() => {
				vocabulary.modifyDescription("Prueba", "noun", "Esto es una prueba");
			}).toThrow(TypeError);
		});

		test("Try to modify the description of a piece of vocabulary passing a description which is an Array but not all elements are string and except", () => {
			expect(() => {
				vocabulary.modifyDescription("Prueba", "noun", ["Esto es una prueba", 1]);
			}).toThrow(TypeError);
		});

		test("Try to modify the description of a piece of vocabulary whose word isn't inserted and except", () => {
			expect(() => {
				vocabulary.modifyDescription("Intento", "noun", ["Esto es una prueba"]);
			}).toThrow(NotFoundError);
		});

		test("Try to modify the description of a piece of vocabulary whose description isn't the same as the one which it was inserted with and except", () => {
			expect(() => {
				vocabulary.modifyDescription("Prueba", "verb", ["Esto es una prueba"]);
			}).toThrow(NotFoundError);
		});

		test("Try to modify the description of a a non-existent piece of vocabulary and except", () => {
			expect(() => {
				vocabulary.modifyDescription("dormir", "verb", ["Echar una siesta larga"]);
			}).toThrow(NotFoundError);
		});

		test("Modify successfully the description of a piece of vocabulary and check that it has changed", () => {
			const oldDesc = vocabulary.getVocabularyWordType("Prueba", "noun").description;

			expect(() => {
				vocabulary.modifyDescription("Prueba", "noun", ["Esto es una prueba"]);
			}).not.toThrow();

			const newDesc = vocabulary.getVocabularyWordType("Prueba", "noun").description;

			expect(oldDesc[0]).not.toEqual(newDesc[0]);
		});
	});

	describe("Testing Vocvocabulary's method deleteVocabulary()", () => {

		test("Try to delete a piece of vocabulary passing a non-valid type and except", () => {
			expect(() => {
				vocabulary.deleteVocabulary("Prueba", "nombre");
			}).toThrow(ValueError);
		});

		test("Try to delete a piece of vocabulary searching by a word not inserted and except", () => {
			expect(() => {
				vocabulary.deleteVocabulary("Intento", "noun");
			}).toThrow(NotFoundError);
		});

		test("Try to delete a piece of vocabulary searching by a different type than the one inserted with and except", () => {
			expect(() => {
				vocabulary.deleteVocabulary("Prueba", "verb");
			}).toThrow(NotFoundError);
		});

		test("Try to delete a non-existent piece of vocabulary and except", () => {
			expect(() => {
				vocabulary.deleteVocabulary("dormir", "verb");
			}).toThrow(NotFoundError);
		});

		test("Delete successfully a piece of vocabulary which is the only one of its type and check that it can't be " +
		"recovered and no vocabulary from that type can be recovered", () => {
			expect(() => {
				vocabulary.deleteVocabulary("Prueba", "noun");
			}).not.toThrow();

			expect(() => {
				vocabulary.getVocabularyWordType("Prueba", "noun");
			}).toThrow(NotFoundError);

			expect(() => {
				vocabulary.getVocabularyType("noun");
			}).toThrow(NotFoundError);
		});

		test("Delete successfully a piece of vocabulary which isn't the only one of its type and check that it can't be " +
		"recovered and that the other vocabulary from that type can be recovered", () => {
			const prevLenght = vocabulary.getVocabularyType("verb").length;

			expect(() => {
				vocabulary.deleteVocabulary("comer", "verb");
			}).not.toThrow();

			expect(() => {
				vocabulary.getVocabularyWordType("comer", "verb");
			}).toThrow(NotFoundError);

			expect(() => {
				vocabulary.getVocabularyType("verb");
			}).not.toThrow();

			expect(vocabulary.getVocabularyType("verb").length).toBeLessThan(prevLenght);
		});

	});
});
