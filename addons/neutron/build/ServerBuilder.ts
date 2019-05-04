import ora from "ora"
import rm from "rimraf"
import webpack from "webpack"
import BuildHelper from "~build/helper"

export class ServerBuilder extends BuildHelper {
	private spinner

	constructor(
		private _config: webpack.Configuration,
		private _rm: string,
		private _message = {
			buildingFor: "building for production...",
			buildComplete: "Server Build Complete",
			buildFailed: "Build Failed",
		}
	) {
		super()
		this.spinner = ora(this._message.buildingFor)
	}

	public build() {
		this.spinner.start()
		try {
			rm(this._rm, async (err) => {
				if (err)
					throw err
				let stats = await ServerBuilder.pack(this._config)
				this.spinner.stop()
				ServerBuilder.log(`${this._config.name} webpack`, stats)
				ServerBuilder.console.done(this._message.buildComplete)
			})
		}
		catch (error) {
			ServerBuilder.console.error(this._message.buildFailed, error)
		}
	}
}
