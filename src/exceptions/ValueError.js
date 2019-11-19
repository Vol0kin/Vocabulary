/* Class representing a value error of some field */
class ValueError extends Error {
	/**
	 * Create a new ValueError exception
	 * @param {string} message - The message to be displayed 
	 */
	constructor(message) {
		super(message);

		/**
		 * Name of the exception
		 * @type {string}
		 * @public
		 */
		this.name = 'ValueError';

		/**
		 * Message associated to the exception
		 * @type {string}
		 * @public
		 */
		this.message = message;
	}	
}

module.exports = ValueError;