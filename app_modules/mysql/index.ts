/**
 * Show warning
 */
export function showWarning(){
	const chalk = require("chalk").default

	console.log(chalk.bgYellow("WARNING"))
	console.log(chalk.yellow("Mysql needs to be downloaded and stored in the following format"))
	console.log("1. mysql-linux")
	console.log("2. mysql-windows")
	console.log("3. mysql-macos")
	console.log(chalk.yellow("use `MySQL Community Server 8.0` x64 architecture only only"))
}

/**
 * Run after post build
 *
 */
export function postBuild(buildPath, platform, arch){
	const fs = require("fs")
	const path = require("path")
	return new Promise((resolve, reject) => {
		fs.writeFileSync(path.resolve(buildPath, "resources/mysql.test"),[ "hello","string", ])
		resolve()
	})
}