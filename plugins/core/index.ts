import TPlugin from "@classes/interface/TPlugin"
import routes from "./routes"
import menus from "./menu"

let models = []
let resolvers = []
let threads = []
let loaders = []

// #!if positron
models = require("./model").default
resolvers = require("./resolvers").default
threads = require("./threads").default
loaders = require("./loaders").default
// #!endif

const CorePlugin: TPlugin = {
	name: "core",
	version: "1.0.0",
	routes,
	menus,
	install: null,
	events: {},
	models,
	migrations: [],
	resolvers,
	loaders,
	threads,
}

export default CorePlugin
