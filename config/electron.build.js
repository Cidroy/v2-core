const path = require("path")
const _package = require("../package.json")

const build = {
	productName: _package.appName,
	appId: _package.appId,
	copyright: "© " + (new Date()).getUTCFullYear + " " + _package.author,
	directories: {
		output: "dist"
	},
	files: [ "dist/electron/**/*",  ],
	dmg: {
		contents: [
			{
				x: 410,
				y: 150,
				type: "link",
				path: "/Applications"
			},
			{
				x: 130,
				y: 150,
				type: "file"
			},
		]
	},
	mac: {
		icon: "build/icons/icon.icns"
	},
	win: {
		icon: "build/icons/icon.ico"
	},
	linux: {
		icon: "build/icons"
	}
}

/**
 * `electron-packager` options
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-packager.html
 */
module.exports = {
	arch: "x64",
	asar: true,
	prune: true,
	dir: path.join(__dirname, "../"),
	icon: path.join(__dirname, "../static/icons/icon"),
	ignore: /(^\/(\.[a-z]+|README|yarn|build|bin|config|logs|src|static|test|dist\/web))|\.gitkeep/,
	out: path.join(__dirname, "../bin"),
	overwrite: true,
	appCopyright: "© " + (new Date()).getUTCFullYear + " " + _package.author,
	appVersion: _package.version,
	executableName: _package.appName,
	prune: true,
	platform: process.env.BUILD_TARGET || "all"
}