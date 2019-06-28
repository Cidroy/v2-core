import path from "path"
import fs from "fs-extra"
import { Logger } from "@classes/CONSOLE"

export default class PrinterTemplateBuilder {
	private log = new Logger("pdf-template-builder")
	private templates: Record<string, string> = {}
	private assets: string[] = []

	public async useConfig(){
		let { config } = await import("~config/addons.pdf-template")
		this.addTemplates(config.templates)
		config.assets.forEach(asset => this.addAsset(asset))
		return true
	}

	constructor(private buildPath: string, private platform: string) {}

	/**
	 * Add Static assets for rendering
	 *
	 * @param {string} source folder destination
	 * @memberof PrinterTemplateBuilder
	 */
	public addAsset(source: string){
		this.assets.push(source)
		return true
	}

	/**
	 * Add Template sources
	 *
	 * @param {Record<string, string>} sources namespace, folder
	 * @memberof PrinterTemplateBuilder
	 */
	public addTemplates(sources: Record<string, string>) {
		this.templates = {
			...this.templates,
			...sources,
		}
		return true
	}

	public async build() {
		try {
			this.log.info("initializing build")
			let destination = path.resolve(this.buildPath, ["linux", "win32",].includes(this.platform) ? "resources/templates" : "")
			let promises: Promise<any>[] = []
			for (const namespace in this.templates) {
				if (this.templates.hasOwnProperty(namespace)) {
					const source = this.templates[namespace]
					if (fs.existsSync(source))
						promises.push(new Promise(async (resolve, reject) => {
							await fs.copy(source, path.join(destination, namespace))
							resolve(true)
						}))
					else this.log.warn(`Could not find directory '${source}' for namespace '${namespace}'`)
				}
			}
			this.assets.forEach(asset => promises.push(new Promise(async (resolve, reject) => {
				await fs.copy(asset, path.join(destination, path.basename(asset)), {
					overwrite: true,
					errorOnExist: false,
				})
				resolve(true)
			})))
			await Promise.all(promises)
			this.log.info("Templates: ") ; console.table(this.templates)
			this.log.info("Assets: ") ; console.table(this.assets)
			this.log.okay("Done")
			return destination
		} catch (error) {
			this.log.error(error)
			this.log.error("unable to copy templates to output.\n please do it manually.")
			return false
		}
	}
}
