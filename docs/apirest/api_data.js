define({ "api": [
  {
    "type": "get",
    "url": "/status",
    "title": "GET /status",
    "description": "<p>Get information on the server's status</p>",
    "group": "Status",
    "name": "GetStatus",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl http://localhost:8080/status",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": \"OK\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/app.js",
    "groupTitle": "Status"
  },
  {
    "type": "delete",
    "url": "/:type",
    "title": "DELETE /:type",
    "description": "<p>Delete a piece of vocabulary identified by its type and word</p>",
    "group": "Vocabulary",
    "name": "DeleteTypeWord",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the word</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X DELETE http://localhost:8080/verb/comer",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/app.js",
    "groupTitle": "Vocabulary",
    "error": {
      "examples": [
        {
          "title": "Error-response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"error\": \"Invalid description! Expected array of strings!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-response:",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"error\": \"Invalid type!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/",
    "title": "GET /",
    "description": "<p>Get information about the microservice</p>",
    "group": "Vocabulary",
    "name": "GetHome",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl http://localhost:8080/",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nWelcome to Vocabulary! To check the status of this microservice and to get an example of usage, check /status",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/app.js",
    "groupTitle": "Vocabulary"
  },
  {
    "type": "get",
    "url": "/:type",
    "title": "GET /:type",
    "description": "<p>Get a bunch of vocabulary identified by its type</p>",
    "group": "Vocabulary",
    "name": "GetType",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the word</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl http://localhost:8080/verb",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/app/app.js",
    "groupTitle": "Vocabulary",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "word",
            "description": "<p>Word to be stored as a vocabulary</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the word to be stored</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the word</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"word\": \"comer\",\n    \"type\": \"verb\",\n    \"description\": [\"munch munch\"]\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"error\": \"Invalid description! Expected array of strings!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-response:",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"error\": \"Invalid type!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:type/:word",
    "title": "GET /:type/:word",
    "description": "<p>Get a piece of vocabulary identified by its type and word</p>",
    "group": "Vocabulary",
    "name": "GetTypeWord",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the word</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "word",
            "description": "<p>Word to be stored (URI encoded)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl http://localhost:8080/verb/comer",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/app/app.js",
    "groupTitle": "Vocabulary",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "word",
            "description": "<p>Word to be stored as a vocabulary</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the word to be stored</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the word</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"word\": \"comer\",\n   \"type\": \"verb\",\n   \"description\": [\"munch munch\"]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"error\": \"Invalid description! Expected array of strings!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-response:",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"error\": \"Invalid type!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/:type/:word",
    "title": "POST /:type/:word",
    "description": "<p>Modify the description of a piece of vocabulary</p>",
    "group": "Vocabulary",
    "name": "PostTypeWord",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the word</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "word",
            "description": "<p>Word to be stored (URI encoded)</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "desc",
            "description": "<p>Description of the piece of vocabulary</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X POST -H 'Content-Type: application/json' -d '{\"desc\": [\"munch\"]}' http://localhost:8080/verb/comer",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/app/app.js",
    "groupTitle": "Vocabulary",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "word",
            "description": "<p>Word to be stored as a vocabulary</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the word to be stored</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the word</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"word\": \"comer\",\n   \"type\": \"verb\",\n   \"description\": [\"munch\"]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"error\": \"Invalid type!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"error\": \"Invalid description! Expected array of strings!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/:type/:word",
    "title": "PUT /:type/:word",
    "description": "<p>Create a new piece of vocabulary containing a word of a certain type</p>",
    "group": "Vocabulary",
    "name": "PutTypeWord",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the word</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "word",
            "description": "<p>Word to be stored (URI encoded)</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "desc",
            "description": "<p>Description of the piece of vocabulary</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X PUT -H 'Content-Type: application/json' -d '{\"desc\": [\"munch munch\"]}' http://localhost:8080/verb/comer",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/app/app.js",
    "groupTitle": "Vocabulary",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "word",
            "description": "<p>Word to be stored as a vocabulary</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the word to be stored</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the word</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"word\": \"comer\",\n   \"type\": \"verb\",\n   \"description\": [\"munch munch\"]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"error\": \"Invalid type!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"error\": \"Invalid description! Expected array of strings!\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
