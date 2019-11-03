const request = require('supertest');
const app = require('../src/index');

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
				expect(response.body).toEqual({"word": "comer", "type": "verb", "description": ["ñam"]});
			});
		});
	});
});