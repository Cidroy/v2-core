// refer : https://github.com/jballant/webpack-strip-block
/**
 * This loader will strip any code that is written in the '#IF DEBUG' to '#ENDIF DEBUG'
 * example : 
 * // input
 * routine(code) #1
 * //# IF DEBUG
 * console.log(info)
 * //# ENDIF DEBUG
 * routine(code) #2
 * // outputs
 * routine(code) #1
 * routine(code) #2
 */
/*jslint node:true */
"use strict"

var loaderUtils = require("loader-utils")

function StripBlockLoader(content) {
	var options = loaderUtils.getOptions(this) || {}
	var startComment = options.start || "IF DEBUG"
	var endComment = options.end || "ENDIF DEBUG"

	var regexPattern = new RegExp("[\\t ]*\/\/# ?" + startComment + " ?[\\s\\S]*?\/\/# ?" + endComment + " ?[\\t ]*\\n?", "g")
	content = content.replace(regexPattern, "")

	if (this.cacheable) this.cacheable(true)

	return content
}

module.exports = StripBlockLoader