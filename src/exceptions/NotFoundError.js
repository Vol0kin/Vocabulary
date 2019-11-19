/* Class representing an error in which a piece or bunch vocabulary is not found */
class NotFoundError extends Error {
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
		this.name = 'NotFoundError';

		/**
		 * Message associated to the exception
		 * @type {string}
		 * @public
		 */
		this.message = message;
	}

}

module.exports = NotFoundError;