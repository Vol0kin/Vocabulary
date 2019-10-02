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
}

module.exports = VocManager;