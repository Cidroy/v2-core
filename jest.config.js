const { pathsToModuleNameMapper } = require("ts-jest/utils")
const fs = require("fs-extra")
const json = require("json5")

const tsconfig = json.parse(fs.readFileSync("./tsconfig.json", "utf8"))
const paths = tsconfig.compilerOptions.paths
delete paths["*"]

module.exports = {
	preset: "ts-jest",
	moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: "<rootDir>/" }),
	verbose: true,
	rootDir: __dirname,
}
