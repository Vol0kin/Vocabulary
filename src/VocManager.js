const Vocabulary = require("./Vocabulary");
const fs = require("fs");

class VocManager {
	constructor() {}

	static get ALLOWED_TYPES() {
		return ["noun", "verb", "adverb", "adjective", "preposition", "conjunction", "expression", "determiner"]
	}

	storeWord(word, type, desc) {
		// Check if the type is found in the allowed types
		if (VocManager.ALLOWED_TYPES.indexOf(type) > -1) {
			// Create a new Vocabulary object
			var vocabulary = new Vocabulary(word, type, desc);
			
			// Store it as a JSON object
			fs.writeFileSync("out-test/out-example.json", JSON.stringify(vocabulary));
		}
	}

	getVocabularyByType(word, type) {
		// THIS PART WILL CHANGE WHEN A DATABASE IS USED
		//*************************************************************************
		// Check that the type is found in the allowed types
		if (VocManager.ALLOWED_TYPES.indexOf(type) > -1) {
			// Read the words
			var readObj = JSON.parse(fs.readFileSync("out-test/out-example.json"));

			// Find the element by the word and type given
			var vocabulary = readObj.find(element =>
				element.word == word && element.type == type
			);
		}
		
		//*************************************************************************

		return vocabulary;
	}

	getVocabularySameType(type) {
		// THIS PART WILL CHANGE WHEN A DATABASE IS USED
		//*************************************************************************
		if (VocManager.ALLOWED_TYPES.indexOf(type) > -1) {
			var readObj = JSON.parse(fs.readFileSync("out-test/out-example.json"));

			// Find the elements which have the same type
			var vocabulary = readObj.filter(element =>
				element.type == type
			);
		}
		//*************************************************************************

		return vocabulary;
	}

	modifyDescription(word, type, newDesc) {
		if (VocManager.ALLOWED_TYPES.indexOf(type) > -1) {
			// TODO
		}
	}

	deleteVocavulary(word, type){
		if (VocManager.ALLOWED_TYPES.indexOf(type) > -1) {
			// TODO
		}
	}
}

module.exports = VocManager;