import path from "path"
import fs from "fs-extra"
import { Logger } from "@classes/CONSOLE"

export default class PrinterTemplateBuilder{
	private log = new Logger("printer-template-builder")

	constructor(private buildPath: string, private platform: string){ }

	public async build(){
		try {
			this.log.info("initializing build")
			let destination = path.resolve(this.buildPath, ["linux", "win32",].includes(this.platform) ? "resources/templates" : "")
			let source = path.resolve(__dirname, "templates")
			await fs.copy(source, destination)
			this.log.okay("Done")
		} catch (error) {
			this.log.error(error)
			this.log.error("unable to copy templates to output.\n please do it manually.")
		}
	}
}
