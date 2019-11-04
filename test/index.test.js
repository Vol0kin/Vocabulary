const request = require('supertest');
const app = require('../src/index');

const comer = {
	"word": "comer",
	"type": "verb",
	"description": ["ñam"]
}

describe("Testing REST API", () => {

	describe("Testing PUT method", () => {

		test("PUT /type/word non-valid type", () => {
			return request(app).put("/verbo/comer").send({"desc": ["ñam"]}).then(response => {
				expect(response.status).toBe(400);
			});
		});

		test("PUT /type/word non-valid description", () => {
			return request(app).put("/verb/comer").send({"desc": "ñam"}).then(response => {
				expect(response.status).toBe(400);
			});
		});

		test("PUT /type/word", () => {
			return request(app).put("/verb/comer").send({"desc": ["ñam"]}).then(response  => {
				expect(response.status).toBe(201);
				expect(response.body).toEqual(comer);
			});
		});
	});

	describe("Testing GET method", () => {

		test("GET /type/word non-valid type", () => {
			return request(app).get("/verbo/comer").then(response => {
				expect(response.status).toBe(400);
			});
		});

		test("GET /type/word non-valid word", () => {
			return request(app).get("/verb/dormir").then(response => {
				expect(response.status).toBe(404);
			});
		});

		test("GET /type/word", () => {
			return request(app).get("/verb/comer").then(response => {
				expect(response.status).toBe(200);
				expect(response.body).toEqual(comer);
			});
		});
	});
});