/* Class representing an error in which a piece or bunch vocabulary is not found */
class NotFoundError extends Error {
	/**
	 * Create a new ValueError exception
	 * @param {String} message - The message to be displayed 
	 */
	constructor(message) {
		super(message);
		this.name = 'NotFoundError';
		this.message = message;
	}

}

module.exports = NotFoundError;