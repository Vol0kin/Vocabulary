const fs = require('fs');

// Definir la clase Vocabulary
class Vocabulary {
	constructor(word, type, description) {
		this.word = word;
		this.type = type;
		this.description = description;
	}
}

module.exports = Vocabulary;