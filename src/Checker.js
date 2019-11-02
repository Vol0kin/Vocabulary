const ValueError = require("./exceptions/ValueError");
const NotFoundError = require("./exceptions/NotFoundError")

/* Class that checks if the given information is correct */
class Checker {
	/**
	 * Creates a new instance of Checker
	 */
	constructor() {}

	/**
	 * Check if the given type is found in the allowed types
	 * @param {Array} allowedTypes Allowed types of vocabulary
	 * @param {string} inputType Type of the vocabulary
	 * @throws {ValueError} Value of type must be in allowedTypes
	 */
	checkTypeInAllowedTypes(allowedTypes, inputType) {
		if (!allowedTypes.includes(inputType)) {
			throw new ValueError('Unvalid value of type. The allowed ones are the following: ' + allowedTypes);
		}
	}

	/**
	 * Check if the given description of the vocabulary is an array of string
	 * @param {Array} description Array of descriptiones to be checked
	 * @throws {TypeError} Type of description must be an Array of string
	 */
	checkDescription(description) {
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
	 * @param {Array} vocabularyList Array that contains the current vocabulary
	 * @param {function} callback Function used to filter the elements
	 * @throws {NotFoundError} The element searched with callback must be in vocabularyList
	 */
	checkFilterElement(vocabularyList, callback) {
		// Filter the list
		var filterResult = vocabularyList.filter(callback);

		// If no elements are found, except
		if (filterResult.length == 0) {
			throw new NotFoundError("Didn't find any vocabulary");
		}

		return filterResult;
	}

	/**
	 * Searches for an element in the list of vocabulary given a callback function
	 * @param {Array} vocabularyList Array that contains the current vocabulary
	 * @param {function} callback Function used to find the element
	 * @throws {NotFoundError} The element searched with callback must be in vocabularyList
	 */
	checkFindElement(vocabularyList, callback) {
		// Find the element
		var element = vocabularyList.find(callback);

		// Except if none is found
		if (element == undefined) {
			throw new NotFoundError("Didn't find any vocabulary matching the given information");
		}

		return element;
	}

	/**
	 * Searches for the index of a piece of vocabulary given a callback function
	 * @param {Array} vocabularyList Array that contains the current vocabulary
	 * @param {function} callback Function used to find the index of the element
	 * @throws {NotFoundError} The element searched with callback must be in vocabularyList
	 */
	checkFindIndexElement(vocabularyList, callback) {
		// Find the index of the element
		var idx = vocabularyList.findIndex(callback);

		// Except if -1 index is given
		if (idx == -1) {
			throw new NotFoundError("Didn't find any vocabulary matching the given information");
		}

		return idx;
	}
}

module.exports = Checker;