const Vocabulary = require("./Vocabulary");
const ValueError = require("./exceptions/ValueError");
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
	addVocabulary(word, type, desc) {
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
	getVocabularyWordType(word, type) {
		// Check that the type is found in the allowed types
		if (VocManager.ALLOWED_TYPES.includes(type)) {
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
	getVocabularyType(type) {
		if (VocManager.ALLOWED_TYPES.includes(type)) {
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
		if (VocManager.ALLOWED_TYPES.includes(type)) {
			// Find the index of the piece of vocabulary which has the same word
			// and type as the ones given
			var idx = this.vocabularyList.findIndex(voc => voc.word == word && voc.type == type);

			// Mofify the description of the piece of vocabulary
			this.vocabularyList[idx].description = newDesc;
		} else {
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
			// Find the index of the piece of vocabulary which has the same word
			// and type as the ones given
			this.vocabularyList = this.vocabularyList.filter(voc =>
				voc.type != type && voc.word != word
			);
		} else {
			throw new ValueError('Unvalid value of type. The allowed ones are the following: ' + VocManager.ALLOWED_TYPES);
		}
	}
}

module.exports = VocManager;