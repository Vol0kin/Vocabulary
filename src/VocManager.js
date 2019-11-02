const Vocabulary = require("./Vocabulary");
const ValueError = require("./ValueError");
const fs = require("fs");

class VocManager {
	/**
	 * Create a new Vocabulary Manager
	 */
	constructor() {
		this.vocabularyList = [];
	}

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
		if (VocManager.ALLOWED_TYPES.includes(type)) {
			// Create a new Vocabulary object
			var vocabulary = new Vocabulary(word, type, desc);

			// Store the element into the list
			this.vocabularyList.push(vocabulary);
		} else {
			throw new ValueError('Unvalid value of type. The allowed ones are the following: ' + VocManager.ALLOWED_TYPES);
		}
	}

	/**
	 * Get a piece of vocabulary identified by the word and its type
	 * @param {String} word - The word corresponding to the piece of vocabulary
	 * @param {String} type - The type of the piece of vocabulary
	 * @return {Vocabulary} A Vocabulary object
	 */
	getVocabularyByType(word, type) {
		// Check that the type is found in the allowed types
		if (VocManager.ALLOWED_TYPES.includes(type))  {

			// Find the element by the word and type given
			var vocabulary = this.vocabularyList.find(element =>
				element.word == word && element.type == type
			);
		} else {
			throw new ValueError('Unvalid value of type. The allowed ones are the following: ' + VocManager.ALLOWED_TYPES);
		}

		return vocabulary;
	}

	/**
	 * Get a bunch of vocabulary with a specific type
	 * @param {String} type - The type of the vocabulary to search
	 * @return {Array} An Array of Vocabulary object
	 */
	getVocabularySameType(type) {
		if (VocManager.ALLOWED_TYPES.includes(type))  {
			// Find the elements which have the same type
			var vocabulary = this.vocabularyList.filter(element =>
				element.type == type
			);
		} else {
			throw new ValueError('Unvalid value of type. The allowed ones are the following: ' + VocManager.ALLOWED_TYPES);
		}

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
		}  else {
			throw new ValueError('Unvalid value of type. The allowed ones are the following: ' + VocManager.ALLOWED_TYPES);
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
		}  else {
			throw new ValueError('Unvalid value of type. The allowed ones are the following: ' + VocManager.ALLOWED_TYPES);
		}
	}
}

module.exports = VocManager;