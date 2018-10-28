const path = require("path")

const TRANSPILE_DEST = path.resolve(__dirname, "..", "dist/server")
const BIN_NAME = "express"

export default {
	config: {
		port: 9101
	},
	pack: {
		input: path.resolve(TRANSPILE_DEST, "./index.js"),
		output: BIN_NAME,
		target: ""
	}
}