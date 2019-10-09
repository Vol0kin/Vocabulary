const Vocabulary = require("./Vocabulary");
const fs = require("fs");

class VocManager {
	/**
	 * Create a new Vocabulary Manager
	 */
	constructor() {}

	/**
	 * Get the allowed type of vocabulary
	 * @return {Array} An Array of Strings
	 */
	static get ALLOWED_TYPES() {
		return ["noun", "verb", "adverb", "adjective", "preposition", "conjunction", "expression", "determiner"]
	}

	/**
	 * Store a new piece of vocabulary
	 * @param {String} word - The word corresponding to the piece of vocabulary
	 * @param {String} type - The type of the piece of vocabulary
	 * @param {Array} desc - An array that describes the vocabulary
	 */
	storeWord(word, type, desc) {
		// Check if the type is found in the allowed types
		if (VocManager.ALLOWED_TYPES.indexOf(type) > -1) {
			// Create a new Vocabulary object
			var vocabulary = new Vocabulary(word, type, desc);
			
			// Store it as a JSON object
			fs.writeFileSync("out-test/out-example.json", JSON.stringify(vocabulary));
		}
	}

	/**
	 * Get a piece of vocabulary identified by the word and its type
	 * @param {String} word - The word corresponding to the piece of vocabulary
	 * @param {String} type - The type of the piece of vocabulary
	 * @return {Vocabulary} A Vocabulary object
	 */
	getVocabularyByType(word, type) {
		// THIS PART WILL CHANGE WHEN A DATABASE IS USED
		//*************************************************************************
		// Check that the type is found in the allowed types
		if (VocManager.ALLOWED_TYPES.indexOf(type) > -1) {
			// Read the words
			var readObj = JSON.parse(fs.readFileSync("out-test/out-example.json"));

			// Find the element by the word and type given
			var vocabulary = readObj.find(element =>
				element.word == word && element.type == type
			);
		}
		
		//*************************************************************************

		return vocabulary;
	}

	/**
	 * Get a bunch of vocabulary with a specific type
	 * @param {String} type - The type of the vocabulary to search
	 * @return {Array} An Array of Vocabulary object
	 */
	getVocabularySameType(type) {
		// THIS PART WILL CHANGE WHEN A DATABASE IS USED
		//*************************************************************************
		if (VocManager.ALLOWED_TYPES.indexOf(type) > -1) {
			var readObj = JSON.parse(fs.readFileSync("out-test/out-example.json"));

			// Find the elements which have the same type
			var vocabulary = readObj.filter(element =>
				element.type == type
			);
		}
		//*************************************************************************

		return vocabulary;
	}

	/**
	 * Modify the description of a piece of vocabulary identified by the word
	 * and its type
	 * @param {String} word - The word corresponding to the piece of vocabulary
	 * @param {String} type - The type of the piece of vocabulary
	 * @param {Array} newDesc - The new description which will be set to the piece of vocabulary
	 */
	modifyDescription(word, type, newDesc) {
		if (VocManager.ALLOWED_TYPES.indexOf(type) > -1) {
			// TODO
		}
	}

	/**
	 * Remove a piece of vocabulary identified by the word and its type
	 * @param {String} word - Word associated to the piece of vocabulary to be removed
	 * @param {String} type - Type of the vocabulary to be removed
	 */
	deleteVocabulary(word, type){
		if (VocManager.ALLOWED_TYPES.indexOf(type) > -1) {
			// TODO
		}
	}
}

module.exports = VocManager;