const VocManager = require("../VocManager");
const fs = require("fs");

const manager = new VocManager()

test("Guarda nueva palabra en la BD y esperar que sea la misma", () => {
	manager.storeWord("Prueba", "sustantivo", ["Intento de algo"]);
	var obj = JSON.parse(fs.readFileSync("out-test/out-example.json"));
	expect(obj).toEqual({word: "Prueba", type: "sustantivo", description: ["Intento de algo"]});
});