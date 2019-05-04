import TPlugin from "@classes/interface/TPlugin"
import routes from "./routes"
import menus from "./menu"

let models = []
let resolvers = []
let threads = []
let loaders = []

// #!if positron
// models = require("./model")
// resolvers = require("./resolvers")
// threads = require("./threads")
// loaders = require("./loaders")
// #!endif

const CorePlugin: TPlugin = {
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
