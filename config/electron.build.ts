import path from "path"
// @ts-ignore
import _package from "~/package"
import electronPackager from "electron-packager"

type Platform = "linux" | "win32" | "darwin" | "mas" | "all" | undefined

/**
 * `electron-packager` options
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-packager.html
 */
const config: electronPackager.Options = {
	arch: "x64",
	asar: false,
	prune: true,
	dir: path.join(__dirname, "../"),
	icon: path.join(__dirname, "../static/icons/icon"),
	ignore: /(^\/(\.[a-z]+|~\$[a-z]+|tsconfig|tslint|classes|package-lock|typescript|app_modules|README|yarn|build|bin|config|logs|src|server|static|test|dist\/web|dist\/server))|\.gitkeep/,
	out: path.join(__dirname, "../bin"),
	overwrite: true,
	appCopyright: "© " + (new Date()).getUTCFullYear + " " + _package.author,
	executableName: _package.appName,
	platform: process.env.BUILD_TARGET as Platform || "all",
}

export default config