import path from "path"
import BuildHelper from "~/build/helper"
import { PORTS } from "@classes/ports"

const TRANSPILE_DEST = BuildHelper.resolve("dist/positron")
const BIN_NAME = "positron"

export default {
	config: {
		port: PORTS.POSITRON
	},
	pack: {
		input: path.resolve(TRANSPILE_DEST, "./index.js"),
		output: BIN_NAME
	}
}