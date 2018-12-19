import path from "path"
import BuildHelper from "~/build/helper"

const TRANSPILE_DEST = BuildHelper.resolve("dist/positron")
const BIN_NAME = "positron"

export default {
	config: {
		port: 9101
	},
	pack: {
		input: path.resolve(TRANSPILE_DEST, "./index.js"),
		output: BIN_NAME
	}
}