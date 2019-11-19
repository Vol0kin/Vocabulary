const Word = require("./Word");
const ValueError = require("./exceptions/ValueError");
const NotFoundError = require("./exceptions/NotFoundError");

/**
 * Class representing a bunch of words - vocabulary in general
 * @class
 * @constructor
 * @public
 */
class Vocabulary {
	/**
	 * Create a new Vocabulary
	 */
	constructor() {
    /**
     * vocabularyList is a list which contains the vocabulary
     * @type {Word[]}
     * @public
     */
    this.vocabularyList = [];
    
    // Add an example vocabulary
		this.addVocabulary("hello world", "expression", ["Expression used by programmers when learning a new programming language or tool"]);
	}

	/**
	 * Static attribute that contains the allowed word types
   * @readonly
   * @enum {string}s
	 */
	static get ALLOWED_TYPES() {
		return {
      NOUN: "noun",
      VERB: "verb",
      ADVERB: "adverb",
      ADJECTIVE: "adjective",
      PREPOSITION: "preposition",
      CONJUNCTION: "conjunction",
      EXPRESSION: "expression",
      DETERMINER: "determiner"
    };
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
			this._checkTypeInAllowedTypes(type);

			// Check if the description is correct
			this._checkDescription(desc);

			// Add the new vocabulary
			var vocabulary = new Word(word, type, desc);
			this.vocabularyList.push(vocabulary);
		} catch (exception) {
			throw exception;
		}
	}

	/**
	 * Get a piece of vocabulary identified by the word and its type
	 * @param {string} word - The word corresponding to the piece of vocabulary
	 * @param {string} type - The type of the piece of vocabulary
	 * @return {Word} A Word object
	 * @throws {ValueError} If non-valid type is passed
	 * @throws {NotFoundError} If no vocabulary matching the given parameters is found
	 */
	getVocabularyWordType(word, type) {
		try {
			// Check if the type is found in the allowed types
			this._checkTypeInAllowedTypes(type);

			// Check if the vocabulary exists and get it if it does
			var vocabulary = this._checkFindElement(
				element => element.word == word && element.type == type
			);
		} catch (exception) {
			throw exception;
		}

		return vocabulary;
	}

	/**
	 * Get a bunch of vocabulary with a specific type
	 * @param {string} type - The type of the vocabulary to search
	 * @return {Word[]} An Array of Word object
	 * @throws {ValueError} If non-valid type is passed
	 * @throws {NotFoundError} If no vocabulary matching the given parameters is found
	 */
	getVocabularyType(type) {
		try {
			// Check if the type is found in the allowed types
			this._checkTypeInAllowedTypes(type);

			// Check if the vocabulary exists and get it if it does
			var vocabulary = this._checkFilterElement(
				element => element.type == type
			);
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
			this._checkTypeInAllowedTypes(type);

			// Check description
			this._checkDescription(newDesc);

			// Find the index of the piece of vocabulary which has the same word
			// and type as the ones given, if it exists
			var index = this._checkFindIndexElement(
				voc => voc.word == word && voc.type == type
			);
			
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
			this._checkTypeInAllowedTypes(type);

			// Find the index of the piece of vocabulary which has the same word
			// and type as the ones given, if it exists
			var index = this._checkFindIndexElement(
				voc => voc.word == word && voc.type == type
			);

			// Remove the element from the vocabulary list
			this.vocabularyList.splice(index, 1);
		} catch (exception) {
			throw exception;
		}
	}

	/**
	 * Check if the given type is found in the allowed types
	 * @param {string} inputType Type of the vocabulary
	 * @throws {ValueError} Value of type must be in allowedTypes
	 */
	_checkTypeInAllowedTypes(inputType) {
		if (!Object.values(Vocabulary.ALLOWED_TYPES).includes(inputType)) {
			throw new ValueError('Unvalid value of type. The allowed ones are the following: ' + Vocabulary.ALLOWED_TYPES);
		}
	}

	/**
	 * Check if the given description of the vocabulary is an array of string
	 * @param {Array} description Array of descriptiones to be checked
	 * @throws {TypeError} Type of description must be an Array of string
	 */
	_checkDescription(description) {
		// Check if description is an array
		if (!Array.isArray(description)) {
			throw new TypeError('Expected decription to be an Array instance');
		}

		// Check if every value is a string
		if (!description.every(value => typeof value == 'string')) {
			throw new TypeError('Expected every value of description to be a String instance');
		}
	}

	/**
	 * Filters the list of vocabulary given a callback function
	 * @param {function} callback Function used to filter the elements
	 * @throws {NotFoundError} The element searched with callback must be in vocabularyList
	 * @return {Array} Array containing the result of filtering
	 */
	_checkFilterElement(callback) {
		// Filter the list
		var filterResult = this.vocabularyList.filter(callback);

		// If no elements are found, except
		if (filterResult.length == 0) {
			throw new NotFoundError("Didn't find any vocabulary");
		}

		return filterResult;
	}

	/**
	 * Searches for an element in the list of vocabulary given a callback function
	 * @param {function} callback Function used to find the element
	 * @throws {NotFoundError} The element searched with callback must be in vocabularyList
	 * @return {Word} Piece of vocabulary corresponding to callback
	 */
	_checkFindElement(callback) {
		// Find the element
		var element = this.vocabularyList.find(callback);

		// Except if none is found
		if (element == undefined) {
			throw new NotFoundError("Didn't find any vocabulary matching the given information");
		}

		return element;
	}

	/**
	 * Searches for the index of a piece of vocabulary given a callback function
	 * @param {function} callback Function used to find the index of the element
	 * @throws {NotFoundError} The element searched with callback must be in vocabularyList
	 * @return {number} Index of the piece of vocabulary given the callback information
	 */
	_checkFindIndexElement(callback) {
		// Find the index of the element
		var idx = this.vocabularyList.findIndex(callback);

		// Except if -1 index is given
		if (idx == -1) {
			throw new NotFoundError("Didn't find any vocabulary matching the given information");
		}

		return idx;
	}
}

module.exports = Vocabulary;