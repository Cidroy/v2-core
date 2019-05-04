import chalk from "chalk"
import webpack from "webpack"
import path from "path"

export default class BuildHelper{
	public static console = {
		error: (e: string, i?: any) => {
			console.log("\n" + chalk.bgRed("ERROR") + " " + chalk.bold(e))
			if (i) console.log(chalk.gray(i))
		},
		warning: (e: string) => console.log("\n" + chalk.bgYellow("WARN") + " " + chalk.bold(e)),
		done: (e: string) => console.log("\n" + chalk.bgGreen("DONE") + " " + chalk.bold(e)),
		log: (e: string) => console.log("\n" + e),
		info: (e: string) => console.log("\n" + chalk.bgBlue("INFO") + " " + e),
	}

	public static log(process: string, data: any, color: string = "yellow", compact: boolean = false) {
		let log = ""
		let strip = false
		let flatData = () => data
			.toString()
			.split(/\r?\n/)
			.forEach(line => {
				if (compact) log += line
				else log += chalk[color].bold("║    ") + line + "\n"
			})

		let consoleLog = () => {
			if (compact) console.log(chalk[color](`${process} >>> `), log)
			else {
				console.log(
					chalk[color].bold(`╓── ${process} ${new Array((35 - process.length) + 1).join("─")}\n`) +
					log +
					chalk[color].bold(`╙${new Array(40).join("─")}\n`)
				)
			}
		}

		try {
			if (data instanceof Array) {
				data.forEach(line => {
					log += chalk[color].bold("║    ") + line + "\n"
				})
			}
			else if (typeof data === "object") {
				data.toString({
					colors: true,
					chunks: false,
				}).split(/\r?\n/).forEach(line => {
					log += chalk[color].bold("║    ") + line + "\n"
				})
			}
			else flatData()
		} catch (error) {
			strip = true
		}

		if (strip) {
			log = ""
			flatData()

			if (/[0-9A-z]+/.test(log)) consoleLog()
		} else consoleLog()
	}

	public static pack(config: webpack.Configuration) {
		return new Promise((resolve, reject) => {
			webpack(config, (err, stats) => {
				if (err) reject(err.stack || err)
				else if (stats.hasErrors()) {
					let err = ""
					BuildHelper.log("Webpack " + <string>config.name, stats)
					reject(err)
				}
				else {
					resolve(stats.toString({
						colors: true,
						modules: false,
						children: false,
						chunks: false,
						chunkModules: false,
					}))
				}
			})
		})
	}

	public static resolve(dir: string) {
		return path.join(__dirname, "..", dir)
	}
}
