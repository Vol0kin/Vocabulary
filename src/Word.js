/**
 * Class representing a word with its type and description
 */
class Word {
	/**
	 * Create a piece of vocabulary
	 * @param {string} word - The word to store
	 * @param {string} type - The type of the word (noun, verb, etc.)
	 * @param {string[]} description - A description of the word (definitions, translations, etc.) 
	 * @constructor
	 */
	constructor(word, type, description) {
		/**
		 * The word to store
		 * @type {string}
		 * @public
		 */
		this.word = word;

		/**
		 * The type of the word
		 * @type {string}
		 * @public
		 */
		this.type = type;

		/**
		 * The description associated to the word
		 * @type {string[]}
		 * @public
		 */
		this.description = description;
	}
}

module.exports = Word;