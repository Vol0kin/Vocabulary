/* Class representing a piece of vocabulary */
class Vocabulary {
	/**
	 * Create a piece of vocabulary
	 * @param {string} word - The word to store
	 * @param {string} type - The type of the word (noun, verb, etc.)
	 * @param {string[]} description - A description of the word (definitions, translations, etc.) 
	 */
	constructor(word, type, description) {
		this.word = word;
		this.type = type;
		this.description = description;
	}
}

module.exports = Vocabulary;