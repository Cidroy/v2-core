import path from "path"
import BuildHelper from "~/build/helper"
import { PORTS } from "@classes/ports"

const TRANSPILE_DEST = BuildHelper.resolve("dist/neutron")
const BIN_NAME = "neutron"

export default {
	config: {
		port: PORTS.NEUTRON
	},
	pack: {
		input: path.resolve(TRANSPILE_DEST, "./index.js"),
		output: BIN_NAME
	}
}