/**
 * url: https://github.com/jaretburkett/electron-icon-maker
 * because it was not working as to my requirement i copied
 * https://i.redd.it/pp0qq40n8zmy.jpg
 * never just copy paste github code - Mr. Cobb
 */

const Jimp = require("jimp")
const path = require("path")
const fs = require("fs")
const icongen = require("icon-gen")


const generateIcons = (input, output) => {
	var pngSizes = [ 16, 24, 32, 48, 64, 128, 256, 512, 1024, ]
	// correct paths
	var o = output
	var oSub = o.endsWith("/") ? o + "" : o + "/"
	var PNGoutputDir = oSub

	const iconOptions = {
		type: "png",
		report: true
	}
	
	// do it
	createPNGs(0)

	// calls itself recursivly
	function createPNGs(position) {
		createPNG(pngSizes[position], function (err, info) {
			console.log(info)
			if (err) {
				if (err) throw new Error(err)
			}
			else if (position < pngSizes.length - 1) {
				// keep going
				createPNGs(position + 1)
			}
			else {
				// done, generate the icons
				icongen(PNGoutputDir, oSub, { type: "png", names: { icns: "icon" }, modes: [ "icns",  ], report: true })
					.then((results) => {
						icongen(PNGoutputDir, oSub, { type: "png", names: { ico: "icon" }, modes: [ "ico",  ], report: true })
							.then((results) => {
								// rename the PNGs to electron format
								console.log("Renaming PNGs to Electron Format")
								fs.copyFileSync(input, PNGoutputDir + "icon.png")
								renamePNGs(0)
							})
							.catch((err) => {
								if (err) throw new Error(err)
							})
					})
					.catch((err) => {
						if (err) throw new Error(err)
					})
			}
		})
	}

	function renamePNGs(position) {
		var startName = pngSizes[position] + ".png"
		var endName = pngSizes[position] + "x" + pngSizes[position] + ".png"
		fs.rename(PNGoutputDir + startName, PNGoutputDir + endName, function (err) {
			console.log("Renamed " + startName + " to " + endName)
			if (err) {
				throw err
			}
			else if (position < pngSizes.length - 1) {
				// not done yet. Run the next one
				renamePNGs(position + 1)
			}
			else {
				console.log("\n ALL DONE")
			}
		})

	}

	function createPNG(size, callback) {
		var fileName = size.toString() + ".png"

		// make dir if does not exist
		if (!fs.existsSync(output)) {
			fs.mkdirSync(output)
		}
		// make sub dir if does not exist
		if (!fs.existsSync(oSub)) {
			fs.mkdirSync(oSub)
		}
		// make dir if does not exist
		if (!fs.existsSync(PNGoutputDir)) {
			fs.mkdirSync(PNGoutputDir)
		}
		Jimp.read(input, function (err, image) {
			if (err) {
				callback(err, null)
			}
			image.resize(size, size)
				.write(PNGoutputDir + fileName, function (err) {
					var logger = "Created " + PNGoutputDir + fileName
					callback(err, logger)
				})
		}).catch(function (err) {
			callback(err, null)
		})
	}
}

generateIcons(
	path.resolve(__dirname, "../static/logo.png"),
	path.resolve(__dirname, "../static/icons")
)