"use strict"

process.env.NODE_ENV = "production"

const chalk = require("chalk")
const del = require("del")
const packager = require("electron-packager")
const webpack = require("webpack")
const Multispinner = require("multispinner")
const { compile } = require("nexe")
const run = require("npm-run")
const path = require("path")

const buildConfig = require("../config/electron.build")
const mainConfig = require("./webpack.electron.main")
const rendererConfig = require("./webpack.electron.renderer")
const splashscreenConfig = require("./webpack.electron.splashscreen")
const serverConfig = require("./webpack.server.build")
const server = require("../config/server.build")

const doneLog = chalk.bgGreen.white(" DONE ") + " "
const errorLog = chalk.bgRed.white(" ERROR ") + " "
const okayLog = chalk.bgBlue.white(" OKAY ") + " "

const pack = (config) => new Promise((resolve, reject) => {
	webpack(config, (err, stats) => {
		if (err) reject(err.stack || err)
		else if (stats.hasErrors()) {
			let err = ""

			stats.toString({
				chunks: false,
				colors: true
			})
				.split(/\r?\n/)
				.forEach(line => {
					err += `    ${line}\n`
				})

			reject(err)
		}
		else {
			resolve(stats.toString({
				chunks: false,
				colors: true
			}))
		}
	})
})

const bundleServer = async (appPaths, platform) => {
	console.log("Building Server")
	try{
		await pack(serverConfig)
		for (const key in appPaths) {
			await compile(Object.assign(server.pack, {
				output: path.resolve(appPaths[key], "resources", server.pack.output),
				target: platform
			}))
		}
	}catch(e){
		console.log(errorLog, "Server build failed because")
		console.log(e)
		throw "Server build failure"
	}
}

const bundleApp = async () => {
	try {
		let appPaths = []
		try{
			appPaths = await packager(buildConfig)
		} catch(err){
			console.log(`\n${errorLog}${chalk.yellow("`electron-packager`")} says...\n`)
			console.log(err + "\n")
			throw "Electron packager failed"
		}
		console.log(`\n${doneLog}\nTime to Pack other things`)
		await bundleServer(appPaths,buildConfig.platform)
	} catch (err) {
		chalk.red(err)
	}
}

const build = () => {
	console.log(chalk.yellow.bold("Building ..."))

	del.sync([ "dist/*", "bin/*", "!.gitkeep",  ])

	const tasks = [ "main", "renderer", "splashscreen", ]
	const m = new Multispinner(tasks, {
		preText: "building",
		postText: "process"
	})

	let results = ""

	m.on("success", () => {
		process.stdout.write("\x1B[2J\x1B[0f")
		console.log(`\n\n${results}`)
		console.log(`${okayLog}take it away ${chalk.yellow("`electron-packager`")}\n`)
		bundleApp()
	})

	pack(mainConfig).then(result => {
		results += result + "\n\n"
		m.success("main")
	}).catch(err => {
		m.error("main")
		console.log(`\n  ${errorLog}failed to build main process`)
		console.error(`\n${err}\n`)
		process.exit(1)
	})

	pack(rendererConfig).then(result => {
		results += result + "\n\n"
		m.success("renderer")
	}).catch(err => {
		m.error("renderer")
		console.log(`\n  ${errorLog}failed to build renderer process`)
		console.error(`\n${err}\n`)
		process.exit(1)
	})

	pack(splashscreenConfig).then(result => {
		results += result + "\n\n"
		m.success("splashscreen")
	}).catch(err => {
		m.error("splashscreen")
		console.log(`\n  ${errorLog}failed to build splashscreen process`)
		console.error(`\n${err}\n`)
		process.exit(1)
	})
}

build()