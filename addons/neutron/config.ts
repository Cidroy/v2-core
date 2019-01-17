import path from "path"
import BuildHelper from "~/build/helper"

const TRANSPILE_DEST = BuildHelper.resolve("dist/neutron")
const BIN_NAME = "neutron"

export default {
	config: {
		port: 9101 // FIXME: change to 9102 on production
	},
	pack: {
		input: path.resolve(TRANSPILE_DEST, "./index.js"),
		output: BIN_NAME
	}
}