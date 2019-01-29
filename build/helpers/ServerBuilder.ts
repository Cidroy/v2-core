import { compile } from "nexe"
import path from "path"

import BuildHelper from "~build/helper"
import { Logger } from "@classes/CONSOLE"
import { Configuration } from "webpack"

export default abstract class ServerExecutableBuilder extends BuildHelper {
	private log: Logger
	protected Namespace: string
	protected ServerName: string

	protected serverConfig: Configuration
	protected config: any

	constructor(private buildPath: string, private platform: string, options: { Namespace: string, ServerName: string, serverConfig: Configuration, config: any }) {
		super()

		this.Namespace = options.Namespace
		this.ServerName = options.ServerName
		this.serverConfig = options.serverConfig
		this.config = options.config

		this.log = new Logger(this.Namespace)
		Logger.Verbose = true
	}

	public async build() {
		let output = path.resolve(this.buildPath, ["linux", "win32",].includes(this.platform) ? `resources/${this.config.pack.output}` : this.config.pack.output)
		if([ "win32", ].includes(this.platform)) output = `${output}.exe`
		this.log.info(`Building ${this.ServerName} Server Executable`)
		this.log.info("path : ", output)
		try {
			this.log.verbose("transpile")
			await ServerExecutableBuilder.pack(this.serverConfig)
			this.log.verbose("compile")
			await this.compile({
				...this.config.pack,
				...{
					output,
					targets: [this.platform,],
				},
			})
			this.log.verbose("compile complete")
			return {
				output,
				targets: [this.platform,],
			}
		} catch (error) {
			ServerExecutableBuilder.console.error(`${this.ServerName} Server build failed because`, error)
			throw `${this.ServerName} Server Build Failure`
		}
	}

	public async compile(conf) {
		this.log.verbose("compile conf", conf)
		return await compile(conf)
	}
}