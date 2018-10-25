const serverConfig = require("./webpack.server.dev")
const webpack = require("webpack")
var rm = require("rimraf")

rm(serverConfig.output.path, err => {
	if (err) throw err
	webpack(serverConfig, (err, stats) => {
		if (err) throw err
		process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false
		}) + "\n\n")
		if (stats.hasErrors()) {
			console.log("Compile Failed with errors")
			process.exit(1)
		}
	})
})