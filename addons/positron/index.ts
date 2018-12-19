import { compile } from "nexe"
import path from "path"

import BuildHelper from "~build/helper"
import serverConfig from "~positron/build/webpack.prod"
import config from "~positron/config"

export default class ServerExecutableBuilder extends BuildHelper{
	constructor(private buildPath: string, private platform: string) { super() }

	public async build(){
		let output = path.resolve(this.buildPath, ["linux", "win32", ].includes(this.platform) ? `resources/${config.pack.output}` : config.pack.output)
		console.log("Building Server Executable")
		console.info("path : ", output)
		try {
			await ServerExecutableBuilder.pack(serverConfig)
			await compile({
				...config.pack,
				...{
					output,
					targets: [this.platform,],
				},
			})
			return {
				output,
				targets: [ this.platform, ],
			}
		} catch (error) {
			ServerExecutableBuilder.console.error("Server build failed because", error)
			throw "Server Build Failure"
		}
	}
}