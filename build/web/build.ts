process.env.NODE_ENV = "production"

import ora from "ora"
import rm from "rimraf"
import chalk from "chalk"
import webpack from "webpack"
import config from "~config/index"
import webpackConfig from "~build/webpack.prod"

class WebBuilder {
	private spinner = ora("building for production...")
	private console = {
		error: (e: string, i?: any) => {
			console.log(chalk.bgRed("ERROR") + " " + chalk.bold(e))
			if (i) console.log(chalk.gray(i))
		},
		warning: (e: string) => console.log(chalk.bgYellow("WARN") + " " + chalk.bold(e)),
		done: (e: string) => console.log(chalk.bgGreen("DONE") + " " + chalk.bold(e)),
		log: (e: string) => console.log(e),
	}

	public build(){
		this.spinner.start()
		
		try {
			rm(config.build.assetsRoot, err => {
				if (err) throw err
				webpack(webpackConfig, (error, stats) => {
					try {
						this.spinner.stop()
						if (error) throw error
						process.stdout.write(stats.toString({
							colors: true,
							modules: false,
							children: false,
							chunks: false,
							chunkModules: false
						}) + "\n\n")
						if (stats.hasErrors()) {
							this.console.error("Build failed with errors.")
							process.exit(1)
						}
						console.log(chalk.cyan("  Build complete.\n"))
					} catch (error) {
						this.console.error("Webpack build failed", error)
					}
				})
			})
		} catch (error) {
			this.console.error("Build Failed", error)
		}
	}
}

let builder = new WebBuilder()
builder.build()