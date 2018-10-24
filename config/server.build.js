const path = require("path")

const TRANSPILE_DEST = path.resolve(__dirname, "..", "dist/server")
const BIN_NAME = "express"

module.exports = {
	pack: {
		input: path.resolve(TRANSPILE_DEST, "./index.js"),
		output: BIN_NAME,
		target: ""
	}
}