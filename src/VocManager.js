const Vocabulary = require("./Vocabulary");
const Checker = require("./Checker");

class VocManager {
	/**
	 * Create a new Vocabulary Manager
	 */
	constructor() {
		this.vocabularyList = [];
		this.checker = new Checker();
	}

	/**
	 * Get the allowed type of vocabulary
	 * @return {string[]} An Array of Strings
	 */
	static get ALLOWED_TYPES() {
		return ["noun", "verb", "adverb", "adjective", "preposition", "conjunction", "expression", "determiner"]
	}

	/**
	 * Store a new piece of vocabulary
	 * @param {string} word - The word corresponding to the piece of vocabulary
	 * @param {string} type - The type of the piece of vocabulary
	 * @param {string[]} desc - An array that describes the vocabulary
	 * @throws {ValueError} If non-valid type is passed
	 * @throws {TypeError} If description passed is not an Array of string
	 */
	addVocabulary(word, type, desc) {
		try {
			// Check if the type is found in the allowed types
			this.checker.checkTypeInAllowedTypes(VocManager.ALLOWED_TYPES, type);

			// Check if the description is correct
			this.checker.checkDescription(desc);

			// Add the new vocabulary
			var vocabulary = new Vocabulary(word, type, desc);
			this.vocabularyList.push(vocabulary);
		} catch (exception) {
			throw exception;
		}
	}

	/**
	 * Get a piece of vocabulary identified by the word and its type
	 * @param {string} word - The word corresponding to the piece of vocabulary
	 * @param {string} type - The type of the piece of vocabulary
	 * @return {Vocabulary} A Vocabulary object
	 * @throws {ValueError} If non-valid type is passed
	 * @throws {NotFoundError} If no vocabulary matching the given parameters is found
	 */
	getVocabularyWordType(word, type) {
		try {
			// Check if the type is found in the allowed types
			this.checker.checkTypeInAllowedTypes(VocManager.ALLOWED_TYPES, type);

			// Check if the vocabulary exists and get it if it does
			var vocabulary = this.checker.checkFindElement(this.vocabularyList,
				element => element.word == word && element.type == type);
		} catch (exception) {
			throw exception;
		}

		return vocabulary;
	}

	/**
	 * Get a bunch of vocabulary with a specific type
	 * @param {string} type - The type of the vocabulary to search
	 * @return {string[]} An Array of Vocabulary object
	 * @throws {ValueError} If non-valid type is passed
	 * @throws {NotFoundError} If no vocabulary matching the given parameters is found
	 */
	getVocabularyType(type) {
		try {
			// Check if the type is found in the allowed types
			this.checker.checkTypeInAllowedTypes(VocManager.ALLOWED_TYPES, type);

			// Check if the vocabulary exists and get it if it does
			var vocabulary = this.checker.checkFilterElement(this.vocabularyList,
				element => element.type == type);
		} catch (exception) {
			throw exception;
		}

		return vocabulary;
	}

	/**
	 * Modify the description of a piece of vocabulary identified by the word
	 * and its type
	 * @param {string} word - The word corresponding to the piece of vocabulary
	 * @param {string} type - The type of the piece of vocabulary
	 * @param {string[]} newDesc - The new description which will be set to the piece of vocabulary
	 * @throws {ValueError} If non-valid type is passed
	 * @throws {NotFoundError} If no vocabulary matching the given parameters is found
	 * @throws {TypeError} If description passed is not an Array of string
	 */
	modifyDescription(word, type, newDesc) {
		try {
			// Check if the type is found in the allowed types
			this.checker.checkTypeInAllowedTypes(VocManager.ALLOWED_TYPES, type);

			// Check description
			this.checker.checkDescription(newDesc);

			// Find the index of the piece of vocabulary which has the same word
			// and type as the ones given, if it exists
			var index = this.checker.checkFindIndexElement(this.vocabularyList,
				voc => voc.word == word && voc.type == type);
			
			// Set new description
			this.vocabularyList[index].description = newDesc;
		} catch (exception) {
			throw exception;
		}
	}

	/**
	 * Remove a piece of vocabulary identified by the word and its type
	 * @param {string} word - Word associated to the piece of vocabulary to be removed
	 * @param {string} type - Type of the vocabulary to be removed
	 * @throws {ValueError} If non-valid type is passed
	 * @throws {NotFoundError} If no vocabulary matching the given parameters is found
	 */
	deleteVocabulary(word, type){
		try {
			// Check if the type is found in the allowed types
			this.checker.checkTypeInAllowedTypes(VocManager.ALLOWED_TYPES, type);

			// Find the index of the piece of vocabulary which has the same word
			// and type as the ones given, if it exists
			var index = this.checker.checkFindIndexElement(this.vocabularyList,
				voc => voc.word == word && voc.type == type);

			// Remove the element from the vocabulary list
			this.vocabularyList.splice(index, 1);
		} catch (exception) {
			throw exception;
		}
	}
}

module.exports = VocManager;