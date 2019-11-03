var express = require('express');
var bodyParser = require('body-parser');
var VocManager = require('./VocManager');


var app = express();
const manager = new VocManager();


var port = process.env.PORT || 8080;


app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Hello world!').status(200);
});

app.get('/status', (req, res) => {
	res.send({"status": "OK"});
});

app.get('/:type/:word', (req, res) => {
	var wordParsed = decodeURI(req.params.word);
	var vocablary = manager.getVocabularyByType(wordParsed, req.params.type);
	res.send(vocablary).status(200);
})

app.listen(port, () => {console.log('Server running at http://127.0.0.1:'+port+'/');})

module.exports = app;