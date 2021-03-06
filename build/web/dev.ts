import config from "~config/index"
if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

import opn from "opn"
import path from "path"
import express from "express"
import webpack from "webpack"
import proxyMiddleware from "http-proxy-middleware"
import env from "~/config/env"
import { RESOLVE_PATHS } from "~build/webpack.base"
const webpackConfig: webpack.Configuration = process.env.NODE_ENV === "testing"
	? require("~build/webpack.prod").default
	: require("~build/webpack.dev").default

webpackConfig.target = "web"
webpackConfig.node = {
	net: "empty",
	fs: "empty",
	os: "empty",
	tls: "empty",
}
webpackConfig.module!.rules.push({
	test: /\.((j|t)sx?|vue)$/,
	enforce: "pre",
	loader: "webpack-preprocessor-loader",
	options: {
		params: {
			...env.preprocessor,
			web: true,
			debug: true,
			development: true,
		},
	},
	exclude: /node_modules/,
	include: RESOLVE_PATHS,
})

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

let devMiddleware = require("webpack-dev-middleware")(compiler, {
	publicPath: webpackConfig.output!.publicPath,
	quiet: true
})

let hotMiddleware = require("webpack-hot-middleware")(compiler, {
	log: false
})
// force page reload when html-webpack-plugin template changes
compiler.plugin("compilation", function (compilation: webpack.Compiler) {
	compilation.plugin("html-webpack-plugin-after-emit", function (data, cb) {
		hotMiddleware.publish({ action: "reload" })
		if(typeof cb === "function") cb()
	})
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
	let options = proxyTable[context]
	if (typeof options === "string") {
		options = { target: options }
	}
	app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require("connect-history-api-fallback")())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static("./static"))

let uri = "http://localhost:" + port

let _resolve
let readyPromise = new Promise(resolve => {
	_resolve = resolve
})

console.log("> Starting dev server...")
devMiddleware.waitUntilValid(() => {
	console.log("> Listening at " + uri + "\n")
	// when env is testing, don"t need open it
	if (autoOpenBrowser && process.env.NODE_ENV !== "testing") {
		opn(uri)
	}
	_resolve()
})

let server = app.listen(port)

export default {
	ready: readyPromise,
	close: () => {
		server.close()
	}
}
