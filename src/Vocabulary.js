const fs = require('fs');

/* Class representing a piece of vocabulary */
class Vocabulary {
	/**
	 * Create a piece of vocabulary
	 * @param {String} word - The word to store
	 * @param {String} type - The type of the word (noun, verb, etc.)
	 * @param {Array} description - A description of the word (definitions, translations, etc.) 
	 */
	constructor(word, type, description) {
		this.word = word;
		this.type = type;
		this.description = description;
	}
}

module.exports = Vocabulary;