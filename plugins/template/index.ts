import TPlugin from "@classes/interface/TPlugin"

let routes = []
let menus = []
let models = []
let resolvers = []
let threads = []
let loaders = []

// #!if positron
models = require("./model").default
resolvers = require("./resolvers").default
threads = require("./threads").default
loaders = require("./loaders").default
// #!else
routes = require("./routes").default
menus = require("./menu").default
// #!endif

const TemplatePlugin: TPlugin = {
	name: "template",
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

export default TemplatePlugin
