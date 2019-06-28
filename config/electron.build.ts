import _package from "~/package.json"
import electronPackager from "electron-packager"
import { resolve } from "~/config/resolve"

type Platform = "linux" | "win32" | "darwin" | "mas" | "all" | undefined

/**
 * `electron-packager` options
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-packager.html
 */
const config: electronPackager.Options = {
	arch: "x64",
	asar: true,
	prune: true,
	dir: resolve(""),
	icon: resolve("static/icons/icon"),
	ignore: /(^\/(\.[a-z]+|~\$[a-z]+|tsconfig|plugins|types|docs|tslint|classes|package-lock|typescript|addons|README|yarn|build|bin|config|logs|src|server|static|test|dist\/web|dist\/positron))|\.gitkeep/,
	out: resolve("bin"),
	overwrite: true,
	appCopyright: "© " + (new Date()).getUTCFullYear + " " + _package.author,
	executableName: _package.appName,
	platform: process.env.BUILD_TARGET as Platform || "all",
}

export default config
