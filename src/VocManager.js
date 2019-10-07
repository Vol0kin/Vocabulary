const Vocabulary = require("./Vocabulary");
const fs = require("fs");

class VocManager {
	constructor() {}

	storeWord(word, type, desc) {
		// Create a new Vocabulary object
		var voc = new Vocabulary(word, type, desc);

		// Store it as a JSON object
		fs.writeFileSync("out-test/out-example.json", JSON.stringify(voc));
	}

	getWordByType(word, type) {
		// THIS PART WILL CHANGE WHEN A DATABASE IS USED
		//*************************************************************************
		// Read the words
		var readObj = JSON.parse(fs.readFileSync("out-test/out-example.json"));

		// Find the element by the word and type given
		var vocabulary = readObj.find(element =>
			element.word == word && element.type == type
		);
		//*************************************************************************

		return vocabulary;
	}

	getWordsSameType(type) {
		// THIS PART WILL CHANGE WHEN A DATABASE IS USED
		//*************************************************************************
		var readObj = JSON.parse(fs.readFileSync("out-test/out-example.json"));

		// Find the elements which have the same type
		var vocabulary = readObj.filter(element =>
			element.type == type
		);
		//*************************************************************************

		return vocabulary;
	}
}

module.exports = VocManager;