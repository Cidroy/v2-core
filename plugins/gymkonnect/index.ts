import path from "path"
import TPlugin from "@classes/interface/TPlugin"

let routes = []
let menus = []
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
// #!else
routes = require("./routes").default
menus = require("./menu").default
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
	printer: {
		templates: path.resolve(__dirname, "templates"),
	}
}
export default GymkonnectPlugin
