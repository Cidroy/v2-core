import ora from "ora"
import rm from "rimraf"
import webpack from "webpack"
import BuildHelper from "~build/helper"

export class WebBuilder extends BuildHelper {
	private spinner

	constructor(
		private _config: webpack.Configuration,
		private _rm: string,
		private _message = {
			buildingFor: "building for production...",
			buildComplete: "Build Complete",
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
				let stats = await WebBuilder.pack(this._config)
				this.spinner.stop()
				WebBuilder.log("webpack", stats)
				WebBuilder.console.done(this._message.buildComplete)
			})
		}
		catch (error) {
			WebBuilder.console.error(this._message.buildFailed, error)
		}
	}
}
