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
		// Read a word and store it in an object
		var readObj = JSON.parse(fs.readFileSync("out-test/out-example.json"));

		// THIS PART WILL CHANGE WHEN A DATABASE IS USED
		// Find the element by the word and type given
		console.log(readObj);
		var vocabulary = readObj.find(element =>
			element.word == word && element.type == type
		);

		return vocabulary;
	}
}

module.exports = VocManager;