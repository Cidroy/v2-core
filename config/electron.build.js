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
	ignore: /(^\/(\.[a-z]+|~\$[a-z]+|tsconfig|tslint|classes|package-lock|typescript|app_modules|README|yarn|build|bin|config|logs|src|server|static|test|dist\/web|dist\/server))|\.gitkeep/,
	out: path.join(__dirname, "../bin"),
	overwrite: true,
	appCopyright: "© " + (new Date()).getUTCFullYear + " " + _package.author,
	appVersion: _package.version,
	executableName: _package.appName,
	prune: true,
	platform: process.env.BUILD_TARGET || "all"
}