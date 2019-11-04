const request = require('supertest');
const app = require('../src/app/app');

const comer = {
	"word": "comer",
	"type": "verb",
	"description": ["ñam"]
}

const invalidDesc = {"error": "Invalid description! Expected array of strings!"};
const invalidType = {"error": "Invalid type!"};
const resourceNotFound = {"error": "Resource not found!"};

describe("Testing REST API", () => {

	describe("Testing PUT method", () => {

		test("PUT /type/word non-valid type", () => {
			return request(app).put("/verbo/comer").send({"desc": ["ñam"]}).then(response => {
				expect(response.status).toBe(400);
				expect(response.body).toEqual(invalidType);
			});
		});

		test("PUT /type/word non-valid description", () => {
			return request(app).put("/verb/comer").send({"desc": "ñam"}).then(response => {
				expect(response.status).toBe(400);
				expect(response.body).toEqual(invalidDesc);
			});
		});

		test("PUT /type/word", () => {
			return request(app).put("/verb/comer").send({"desc": ["ñam"]}).then(response  => {
				expect(response.status).toBe(201);
				expect(response.body).toStrictEqual(comer);
			});
		});
	});

	describe("Testing GET method", () => {

		test("GET /type/word non-valid type", () => {
			return request(app).get("/verbo/comer").then(response => {
				expect(response.status).toBe(400);
				expect(response.body).toEqual(invalidType);
			});
		});

		test("GET /type/word non-valid word", () => {
			return request(app).get("/verb/dormir").then(response => {
				expect(response.status).toBe(404);
				expect(response.body).toEqual(resourceNotFound);
			});
		});

		test("GET /type/word", () => {
			return request(app).get("/verb/comer").then(response => {
				expect(response.status).toBe(200);
				expect(response.body).toEqual(comer);
			});
		});
	});

	describe("Testing GET method II", () => {

		beforeAll(() => {
			return request(app).put("/verb/dormir").send({"desc": ["zzz"]});
		})
		
		test("GET /type non-valid type", () => {
			return request(app).get("/vverb").then(response => {
				expect(response.status).toBe(400);
				expect(response.body).toEqual(invalidType);
			});
		});

		test("GET /type no elements", () => {
			return request(app).get("/noun").then(response => {
				expect(response.status).toBe(404);
				expect(response.body).toEqual(resourceNotFound);
			});
		});

		test("GET /type", () => {
			return request(app).get("/verb").then(response => {
				expect(response.status).toBe(200);
				expect(response.body).toBeInstanceOf(Array);
				expect(response.body.length).toBe(2);
			});
		});
	});

	describe("Testing POST method", () => {

		const desc = {
			"desc": ["zzzzzz"]
		}
		
		test("POST /type/word non-valid type", () => {
			return request(app).post("/verbo/dormir").send(desc).then(response => {
				expect(response.status).toBe(400);
				expect(response.body).toEqual(invalidType);
			});
		});

		test("POST /type/word non-valid word", () => {
			return request(app).post("/verb/dormitar").send(desc).then(response => {
				expect(response.status).toBe(404);
				expect(response.body).toEqual(resourceNotFound);
			});
		});

		test("POST /type/word non-valid description", () => {
			return request(app).post("/verb/dormir").send({"desc": "zzzzzz"}).then(response => {
				expect(response.status).toBe(400);
				expect(response.body).toEqual(invalidDesc);
			});
		});

		test("POST /type/word", () => {
			return request(app).post("/verb/dormir").send(desc).then(response => {
				expect(response.status).toBe(200);
				expect(response.body).toStrictEqual({"word": "dormir", "type": "verb", "description": ["zzzzzz"]});
			});
		});
	});

	describe("Testing DELETE method", () => {

		test("DELETE /type/word non-valid type", () => {
			return request(app).delete("/vreb/dormir").then(response => {
				expect(response.status).toBe(400);
				expect(response.body).toEqual(invalidType);
			});
		});

		test("DELETE /type/word non-valid word", () => {
			return request(app).delete("/verb/dormitar").then(response => {
				expect(response.status).toBe(404);
				expect(response.body).toEqual(resourceNotFound);
			});
		});

		test("DELETE /type/word", () => {
			return request(app).delete("/verb/dormir").then(response => {
				expect(response.status).toBe(204);
			});
		});
	});

	describe("Testing /status", () => {

		test("GET /status", () => {
			return request(app).get("/status").then(response => {
				expect(response.status).toBe(200);
				expect(response.body).toEqual({"status": "OK"});
			});
		});
	});
});