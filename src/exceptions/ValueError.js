/* Class representing a value error of some field */
class ValueError extends Error {
	/**
	 * Create a new ValueError exception
	 * @param {String} message - The message to be displayed 
	 */
	constructor(message) {
		super(message);
		this.name = 'ValueError';
		this.message = message;
	}	
}

module.exports = ValueError;