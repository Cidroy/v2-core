const path = require("path")
const _package = require("../package.json")

/**
 * `electron-packager` options
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-packager.html
 */
module.exports = {
	arch: "x64",
	asar: false,
	prune: true,
	dir: path.join(__dirname, "../"),
	icon: path.join(__dirname, "../static/icons/icon"),
	ignore: /(^\/(\.[a-z]+|typescript|app_modules|README|yarn|build|bin|config|logs|src|static|test|dist\/web))|\.gitkeep/,
	out: path.join(__dirname, "../bin"),
	overwrite: true,
	appCopyright: "© " + (new Date()).getUTCFullYear + " " + _package.author,
	appVersion: _package.version,
	executableName: _package.appName,
	prune: true,
	platform: process.env.BUILD_TARGET || "all"
}