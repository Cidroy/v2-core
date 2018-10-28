import serverConfig from "~build/server/webpack.dev"
import webpack from "webpack"
import rm from "rimraf"

class DevServer {
	constructor() {}
	public start(){
		rm((<webpack.Output>serverConfig.output).path, err => {
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
	}
}

let devServer = new DevServer()
devServer.start()