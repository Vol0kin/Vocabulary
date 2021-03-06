var express = require('express');
var bodyParser = require('body-parser');
var Vocabulary = require('../Vocabulary');
const ValueError = require('../exceptions/ValueError');

var app = express();
const vocabulary = new Vocabulary();

app.use(bodyParser.json());

/**
 * @apiDefine success200
 * @apiSuccess {String} word Word to be stored as a vocabulary
 * @apiSuccess {String} type Type of the word to be stored
 * @apiSuccess {String[]} description Description of the word
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "word": "comer",
 *        "type": "verb",
 *        "description": ["munch munch"]
 *     } 
 */

 /**
 * @apiDefine success200_post
 * @apiSuccess {String} word Word to be stored as a vocabulary
 * @apiSuccess {String} type Type of the word to be stored
 * @apiSuccess {String[]} description Description of the word
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "word": "comer",
 *        "type": "verb",
 *        "description": ["munch"]
 *     } 
 */

/**
 * @apiDefine success200_array
 * @apiSuccess {String} word Word to be stored as a vocabulary
 * @apiSuccess {String} type Type of the word to be stored
 * @apiSuccess {String[]} description Description of the word
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "word": "comer",
 *         "type": "verb",
 *         "description": ["munch munch"]
 *       }
 *     ] 
 */

/**
 * @apiDefine error400_type
 * @apiErrorExample {json} Error-response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "error": "Invalid description! Expected array of strings!"
 *     }
 */

/**
 * @apiDefine error400_desc
 * @apiErrorExample {json} Error-response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "error": "Invalid type!"
 *     }
 */

/**
 * @apiDefine error404
 * @apiErrorExample {json} Error-response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "error": "Invalid type!"
 *     }
 */

/**
 * @apiDefine success201
 * @apiSuccess {String} word Word to be stored as a vocabulary
 * @apiSuccess {String} type Type of the word to be stored
 * @apiSuccess {String[]} description Description of the word
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        "word": "comer",
 *        "type": "verb",
 *        "description": ["munch munch"]
 *     } 
 */

/**
 * @api {get} /status GET /status
 * @apiDescription Get information on the server's status
 * @apiGroup Status
 * @apiName GetStatus
 * @apiExample {curl} Example usage:
 *     curl http://localhost:8080/status
 * @apiSuccess {String} status Status of the server
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "status": "OK",
 * 				"example": {
 * 					"route": "/expression/hello%20world",
 * 					"value": {"word":"hello world","type":"expression","description":["Expression used by programmers when learning a new programming language or tool"]}
 * 				}
 *     }
 */
app.get('/status', (req, res) => {
	res.send({
						"status": "OK",
						"example": {
							"route": "/expression/hello%20world",
							"value": {"word":"hello world","type":"expression","description":["Expression used by programmers when learning a new programming language or tool"]}
						}
		    	});
});

/**
 * @api {get} / GET /
 * @apiDescription Get information about the microservice
 * @apiGroup Vocabulary
 * @apiName GetHome
 * @apiExample {curl} Example usage:
 *     curl http://localhost:8080/
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     Welcome to Vocabulary! To check the status of this microservice and to get an example of usage, check /status
 */
app.get('/', (req, res) => {
	res.send("Welcome to Vocabulary! To check the status of this microservice and to get an example of usage, check /status")
});

/**
 * @api {put} /:type/:word PUT /:type/:word
 * @apiDescription Create a new piece of vocabulary containing a word of a certain type
 * @apiGroup Vocabulary
 * @apiName PutTypeWord
 * @apiParam {String} type Type of the word
 * @apiParam {String} word Word to be stored (URI encoded)
 * @apiParam {String[]} desc Description of the piece of vocabulary
 * @apiExample {curl} Example usage:
 *     curl -X PUT -H 'Content-Type: application/json' -d '{"desc": ["munch munch"]}' http://localhost:8080/verb/comer
 * @apiUse success200
 * @apiUse error400_desc
 * @apiUse error400_type
 */
app.put('/:type/:word', (req, res) => {
	var word = decodeURI(req.params.word);

	try {
		vocabulary.addVocabulary(word, req.params.type, req.body.desc);
		res.status(201).json(vocabulary.getVocabularyWordType(word, req.params.type));
	} catch (exception) {
		if (exception instanceof TypeError) {
			res.status(400).send({"error": "Invalid description! Expected array of strings!"});
		} else {
			res.status(400).send({"error": "Invalid type!"});
		}
	}
});

/**
 * @api {get} /:type/:word GET /:type/:word
 * @apiDescription Get a piece of vocabulary identified by its type and word
 * @apiGroup Vocabulary
 * @apiName GetTypeWord
 * @apiParam {String} type Type of the word
 * @apiParam {String} word Word to be stored (URI encoded)
 * @apiExample {curl} Example usage:
 *     curl http://localhost:8080/verb/comer
 * @apiUse success200
 * @apiUse error400_type
 * @apiUse error404
 */
app.get('/:type/:word', (req, res) => {
	var word = decodeURI(req.params.word);

	try {
		var voc = vocabulary.getVocabularyWordType(word, req.params.type);
		res.status(200).json(voc);
	} catch (exception) {
		if (exception instanceof ValueError) {
			res.status(400).send({"error": "Invalid type!"});
		} else {
			res.status(404).send({"error": "Resource not found!"});
		}
	}
});

/**
 * @api {get} /:type GET /:type
 * @apiDescription Get a bunch of vocabulary identified by its type
 * @apiGroup Vocabulary
 * @apiName GetType
 * @apiParam {String} type Type of the word
 * @apiExample {curl} Example usage:
 *     curl http://localhost:8080/verb
 * @apiUse success200_array
 * @apiUse error400_type
 * @apiUse error404
 */
app.get('/:type', (req, res) => {
	try {
		var voc = vocabulary.getVocabularyType(req.params.type);
		res.status(200).json(voc);
	} catch (exception) {
		if (exception instanceof ValueError) {
			res.status(400).send({"error": "Invalid type!"});
		} else {
			res.status(404).send({"error": "Resource not found!"});
		}
	}
});

/**
 * @api {post} /:type/:word POST /:type/:word
 * @apiDescription Modify the description of a piece of vocabulary
 * @apiGroup Vocabulary
 * @apiName PostTypeWord
 * @apiParam {String} type Type of the word
 * @apiParam {String} word Word to be stored (URI encoded)
 * @apiParam {String[]} desc Description of the piece of vocabulary
 * @apiExample {curl} Example usage:
 *     curl -X POST -H 'Content-Type: application/json' -d '{"desc": ["munch"]}' http://localhost:8080/verb/comer
 * @apiUse success200_post
 * @apiUse error400_desc
 * @apiUse error400_type
 */
app.post('/:type/:word', (req, res) => {
	var word = decodeURI(req.params.word);

	try {
		vocabulary.modifyDescription(word, req.params.type, req.body.desc);
		res.status(200).json(vocabulary.getVocabularyWordType(word, req.params.type));
	} catch (exception) {
		if (exception instanceof ValueError) {
			res.status(400).send({"error": "Invalid type!"});
		} else if (exception instanceof TypeError) {
			res.status(400).send({"error": "Invalid description! Expected array of strings!"});
		} else {
			res.status(404).send({"error": "Resource not found!"});
		}
	}
});

/**
 * @api {delete} /:type DELETE /:type
 * @apiDescription Delete a piece of vocabulary identified by its type and word
 * @apiGroup Vocabulary
 * @apiName DeleteTypeWord
 * @apiParam {String} type Type of the word
 * @apiExample {curl} Example usage:
 *     curl -X DELETE http://localhost:8080/verb/comer
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 No Content
 * @apiUse error400_type
 * @apiUse error404
 */
app.delete('/:type/:word', (req, res) => {
	var word = decodeURI(req.params.word);

	try {
		vocabulary.deleteVocabulary(word, req.params.type);
		res.sendStatus(204);
	} catch (exception) {
		if (exception instanceof ValueError) {
			res.status(400).send({"error": "Invalid type!"});
		} else {
			res.status(404).send({"error": "Resource not found!"});
		}
	}
});

module.exports = app;