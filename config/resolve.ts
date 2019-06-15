import path from "path"
export function resolve(dir: string) {
	let dirname = "__WEBPACK__DIRNAME__/config"
	// #!if 0
	dirname = __dirname
	// #!endif
	return path.join(dirname, "..", dir)
}
