import { compile } from "nexe"
import path from "path"

import BuildHelper from "~build/helper"
import serverConfig from "~neutron/build/webpack.prod"
import config from "~neutron/config"
import { Logger } from "@classes/CONSOLE"

export default class ServerExecutableBuilder extends BuildHelper{
	private log: Logger

	constructor(private buildPath: string, private platform: string) {
		super()
		this.log = new Logger("neutron/binary-builder")
		Logger.Verbose = true
	}

	public async build(){
		let output = path.resolve(this.buildPath, ["linux", "win32", ].includes(this.platform) ? `resources/${config.pack.output}` : config.pack.output)
		this.log.info("Building Neutron Server Executable")
		this.log.info("path : ", output)
		try {
			this.log.verbose("transpile")
			await ServerExecutableBuilder.pack(serverConfig)
			this.log.verbose("compile")
			await this.compile({
				...config.pack,
				...{
					output,
					targets: [this.platform,],
				},
			})
			this.log.verbose("compile complete")
			return {
				output,
				targets: [ this.platform, ],
			}
		} catch (error) {
			ServerExecutableBuilder.console.error("Neutron Server build failed because", error)
			throw "Neutron Server Build Failure"
		}
	}

	public async compile(conf){
		this.log.verbose("compile conf", conf)
		return await compile(conf)
	}
}