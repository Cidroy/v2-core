/**
 * url: https://github.com/jaretburkett/electron-icon-maker
 * because it was not working as to my requirement i copied.
 * https://i.redd.it/pp0qq40n8zmy.jpg,
 * never just copy paste github code - Mr. Cobb.
 */

import Jimp from "jimp"
import path from "path"
import fs from "fs"
import iconGenerator from "icon-gen"
import chalk from "chalk"
import rm from "rimraf"
import { resolve } from "~build/webpack.base"

class IconGenerator {
	private input: string
	private output: string
	private pngSizes: number[] = [16, 24, 32, 48, 64, 128, 256, 512, 1024,]
	private PNGoutputDir: string
	private iconOptions = {
		type: "png",
		report: true,
	}
	private console = {
		error: (e: string,i ?: any) =>{
			console.log(chalk.bgRed("ERROR") + " " + chalk.bold(e))
			if(i) console.log(chalk.gray(i))
		},
		warning: (e: string) => console.log(chalk.bgYellow("WARN") + " " + chalk.bold(e)),
		done: (e: string) => console.log(chalk.bgGreen("DONE") + " " + chalk.bold(e)),
		log: (e: string) => console.log(e),
	}

	constructor(input: string, output: string) {
		this.input = input
		this.output = output

		// correct paths
		let o = output
		this.PNGoutputDir = o.endsWith("/") ? o + "" : o + "/"
	}

	public clean(): void{ rm.sync(this.PNGoutputDir) }

	public async generate(position: number = 0): Promise<boolean>{
		let info = await this.createPNG(this.pngSizes[position])
		console.log(info)
		if(position < this.pngSizes.length - 1) this.generate(++position)
		else {
			try{
				// done, generate the icons
				await iconGenerator(
					this.PNGoutputDir,
					this.PNGoutputDir,
					{ type: "png", names: { icns: "icon" }, modes: ["icns",], report: true }
				)
				await iconGenerator(
					this.PNGoutputDir,
					this.PNGoutputDir,
					{ type: "png", names: { ico: "icon" }, modes: ["ico",], report: true }
				)
				// rename the PNGs to electron format
				this.console.log("Renaming PNGs to Electron Format")
				fs.copyFileSync(this.input, this.PNGoutputDir + "icon.png")
				this.renamePNG()
			}catch(error){
				this.console.error("Generator failed", error)
				throw error
			}
		}
		return true
	}

	private async createPNG(size: number): Promise<string>{
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
			this.console.error("Create PNG Failed", error)
			throw error
		}
	}

	private renamePNG(position: number = 0): void{
		let startName = this.pngSizes[position] + ".png"
		let endName = this.pngSizes[position] + "x" + this.pngSizes[position] + ".png"
		try {
			fs.rename(
				this.PNGoutputDir + startName,
				this.PNGoutputDir + endName,
				err => {
					this.console.log("Renamed " + startName + " to " + endName)
					if (err) throw err
					else if (position < this.pngSizes.length - 1) this.renamePNG(position + 1) // not done yet. Run the next one
					else this.console.done("ALL DONE")
				}
			)
		} catch (error) {
			this.console.error("Rename Failed", error)
			throw error
		}
	}
}

let generator = new IconGenerator(
	resolve("static/logo.png"),
	resolve("static/icons")
)

generator.clean()
generator.generate()