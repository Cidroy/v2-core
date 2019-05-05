import TPlugin from "@classes/interface/TPlugin"
import routes from "./routes"
import menus from "./menu"

let models = []
let resolvers = []
let threads = []
let migrations = []
let loaders = []

// #!if positron
models = require("./model").default
resolvers = require("./resolvers").default
loaders = require("./loaders").default
threads = require("./threads").default
// #!endif

const GymkonnectPlugin: TPlugin = {
	name: "gymkonnect",
	version: "0.0.1",
	routes,
	menus,
	install: null,
	events: {},
	models,
	resolvers,
	migrations,
	loaders,
	threads,
}
export default GymkonnectPlugin
