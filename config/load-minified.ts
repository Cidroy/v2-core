import fs from "fs"
import UglifyJS from "uglify-es"

export default function(filePath) {
	let code = fs.readFileSync(filePath, "utf-8")
	let result = UglifyJS.minify(code)
	if (result.error) return ""
	return result.code
}
