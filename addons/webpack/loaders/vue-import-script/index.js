/**
 * Imports a relative ts|js file into the .vue file
 * given the .vue file does not have any script tag
 */

/*jslint node:true */
"use strict"

const path = require("path")
const fs = require("fs-extra")

const relate = file => `.${path.sep}${file}`
const supportedLangs = [ "ts", "js" ]

function VueImportScript(content){
	try {
		if (this.cacheable) this.cacheable(true)
		const regexPattern = /(<script[\s\S]*?>[\s\S]*?<\/script>)|(<script[\s\S]*?\/>)/
		if (regexPattern.test(content)) throw "SCRIPT_EXISTS"

		const resourcePath = this.resourcePath

		let lang = false
		let scriptPath = false
		supportedLangs.some(_lang => {
			let _scriptPath = `${resourcePath}.${_lang}`
	
			if(fs.existsSync(_scriptPath)){
				lang = _lang
				scriptPath = _scriptPath
				return true
			}
		})

		if(!scriptPath) throw "NO_SUPPORTED_SCRIPT_FILE_EXISTS"
		const append = `<script src="${relate(path.basename(scriptPath))}" lang="${lang}"/>`
		content = `${content}\n${append}`
	} catch (error) {}
	return content
}

export default VueImportScript