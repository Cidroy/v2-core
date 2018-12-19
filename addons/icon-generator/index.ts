/**
 * url: https://github.com/jaretburkett/electron-icon-maker
 * because it was not working as to my requirement i copied.
 * https://i.redd.it/pp0qq40n8zmy.jpg,
 * never just copy paste github code - Mr. Cobb.
 */

import Jimp from "jimp"
import fs from "fs"
import iconGenerator from "icon-gen"
import rm from "rimraf"
import BuildHelper from "~build/helper"

export default class IconGenerator extends BuildHelper {
	private input: string
	private output: string
	private pngSizes: number[] = [16,]
	private PNGoutputDir: string

	constructor(input: string, output: string) {
		super()
		this.input = input
		this.output = output

		// correct paths
		let o = output
		this.PNGoutputDir = o.endsWith("/") ? o + "" : o + "/"

		IconGenerator.log("icon-generator", `Input: ${this.input}\nOutput: ${this.PNGoutputDir}`)
	}

	public sizes(s: number[]){ this.pngSizes = s }

	public clean(): void { rm.sync(this.PNGoutputDir) }

	public async generate(position: number = 0): Promise<boolean> {
		try {
			// generate the icons
			await this.generatePNG()
			await this.generateICNS()
			await this.generateICO()
			// rename the PNGs to electron format
			IconGenerator.console.log("Renaming PNGs to Electron Format")
			fs.copyFileSync(this.input, this.PNGoutputDir + "icon.png")
			this.renamePNG()
		} catch (error) {
			IconGenerator.console.error("Generator failed", error)
			throw error
		}
		return true
	}

	public async generatePNG(position: number = 0): Promise<boolean>{
		try {
			let info = await this.createPNG(this.pngSizes[position])
			console.log(info)
			if (position < this.pngSizes.length - 1) await this.generatePNG(++position)
			return true
		} catch (error) {
			IconGenerator.console.error("PNG Generator failed", error)
			throw error
		}
		return false
	}

	public async generateICNS() {
		try {
			await iconGenerator(
				this.PNGoutputDir,
				this.PNGoutputDir,
				{ type: "png", icns: { name: "icon", sizes: this.pngSizes }, report: true }
			)
		} catch (error) {
			IconGenerator.console.error("ICNS Generator failed", error)
			throw error
		}
	}

	public async generateICO() {
		try {
			await iconGenerator(
				this.PNGoutputDir,
				this.PNGoutputDir,
				{ type: "png", ico: { name: "icon", sizes: this.pngSizes }, report: true }
			)
		} catch (error) {
			IconGenerator.console.error("ICO Generator failed", error)
			throw error
		}
	}

	private async createPNG(size: number): Promise<string> {
		let fileName = size.toString() + ".png"
		try {
			if (!fs.existsSync(this.output)) fs.mkdirSync(this.output)
			if (!fs.existsSync(this.PNGoutputDir)) fs.mkdirSync(this.PNGoutputDir)

			let image: Jimp = await Jimp.read(this.input)
			await image.resize(size, size)
				.writeAsync(this.PNGoutputDir + fileName)
			let logger = "Created " + fileName
			return logger
		} catch (error) {
			IconGenerator.console.error("Create PNG Failed", error)
			throw error
		}
	}

	private renamePNG(position: number = 0): void {
		let startName = this.pngSizes[position] + ".png"
		let endName = this.pngSizes[position] + "x" + this.pngSizes[position] + ".png"
		try {
			fs.rename(
				this.PNGoutputDir + startName,
				this.PNGoutputDir + endName,
				err => {
					IconGenerator.console.log("Renamed " + startName + " to " + endName)
					if (err) throw err
					else if (position < this.pngSizes.length - 1) this.renamePNG(position + 1) // not done yet. Run the next one
					else IconGenerator.console.done("ALL DONE")
				}
			)
		} catch (error) {
			IconGenerator.console.error("Rename Failed", error)
			throw error
		}
	}
}
