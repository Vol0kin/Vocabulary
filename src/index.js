var express = require('express');
var bodyParser = require('body-parser');
var VocManager = require('./VocManager');

var port = process.env.PORT || 8080;

var app = express();
const manager = new VocManager();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.put('/:type/:word', (req, res) => {
	var word = decodeURI(req.params.word);

	try {
		manager.addVocabulary(word, req.params.type, req.body.desc);
		res.status(201).json(manager.getVocabularyWordType(word, req.params.type));
	} catch (exception) {
		res.status(400).send({"error": "Wrong input information!"});
	}
});

app.get('/:type/:word', (req, res) => {
	var word = decodeURI(req.params.word);

	try {
		var vocabulary = manager.getVocabularyWordType(word, req.params.type);
		res.status(200).json(vocabulary);
	} catch (exception) {
		res.status(404).send({"error": "Resource not found!"});
	}
});

app.get('/:type', (req, res) => {
	try {
		var vocabulary = manager.getVocabularyType(req.params.type);
		res.status(200).json(vocabulary);
	} catch (exception) {
		res.status(404).send({"error": "Resource not found!"});
	}
});

app.post('/:type/:word', (req, res) => {
	var word = decodeURI(req.params.word);

	try {
		manager.modifyDescription(word, req.params.type, req.body.desc);
		res.status(200).json(manager.getVocabularyWordType(word, req.params.type));
	} catch (exception) {
		if (exception instanceof TypeError) {
			res.status(400).send({"error": "Wrong type"});
		} else {
			res.status(404).send({"error": "Resource not found!"});
		}
	}
});

app.delete('/:type/:word', (req, res) => {
	var word = decodeURI(req.params.word);

	try {
		manager.deleteVocabulary(word, req.params.type);
		res.status(204).send({"status": "OK"});
	} catch (exception) {
		res.status(404).send({"error": "Resource not found!"});
	}
});


app.get('/status', (req, res) => {
	res.send({"status": "OK"});
});

app.listen(port, () => {console.log('Server running at http://127.0.0.1:'+port+'/');})

module.exports = app;