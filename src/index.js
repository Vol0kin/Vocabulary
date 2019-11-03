var express = require('express');
var bodyParser = require('body-parser');
var VocManager = require('./VocManager');

var port = process.env.PORT || 8080;

var app = express();
const manager = new VocManager();

app.use(bodyParser.json());

app.put('/:type/:word', (req, res) => {
	var word = decodeURI(req.params.word);

	try {
		manager.addVocabulary(word, req.params.type, req.body.desc);
	} catch (exception) {
		res.status(400);
	}

	res.status(201).json(manager.getVocabularyWordType(word, req.params.type));
});

app.get('/', (req, res) => {
	res.send('Hello world!').status(200);
});

app.get('/:type/:word', (req, res) => {
	var wordParsed = decodeURI(req.params.word);
	var vocablary = manager.getVocabularyByType(wordParsed, req.params.type);
	res.send(vocablary).status(200);
});

app.get(':/type', (req, res) => {

});


app.get('/status', (req, res) => {
	res.send({"status": "OK"});
});

app.listen(port, () => {console.log('Server running at http://127.0.0.1:'+port+'/');})

module.exports = app;