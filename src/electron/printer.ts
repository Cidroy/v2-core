import { BrowserWindow, PrintToPDFOptions, ipcRenderer as ipc } from "electron"
import fs from "fs"
import { Logger } from "@classes/CONSOLE"
import uuid from "uuid"
import path from "path"

export default class Printer{
	private static log = new Logger("electron/printer")
	private static get TIMEOUT(){ return 1000 * 60 }

	public static async requestPrintPDF(source: string, destination: string, options: PrintToPDFOptions = {}){
		let id = uuid()
		let logger = new Logger(`${id}@${Printer.log.prefix}`)
		logger.verbose("new job")
		new Promise((resolve, reject) => {
			logger.verbose("sent to main thread", {
				source,
				destination,
				options,
				id,
			})
			ipc.send("print-to-pdf", {
				source,
				destination,
				options,
				id,
			})
			ipc.once(`wrote-pdf-${id}`, (event, data) => {
				logger.verbose("job complete")
				resolve(data)
			})
			ipc.once(`failed-pdf-${id}`, (event, error) => {
				logger.verbose("job failed")
				reject(error)
			})
			setTimeout(() => {
				logger.verbose("job timedout")
				reject(new Error("PDF Writing Timedout"))
			}, Printer.TIMEOUT)
		})
	}

	public static async printPDF(id:string, printer: BrowserWindow, source: string, destination: string, options: PrintToPDFOptions = {}){
		let logger = new Logger(`${id}@${Printer.log.prefix}`)
		logger.verbose("print", source, "to", destination, "options:", options)
		let printComplete = new Promise((resolve, reject) => {
			logger.verbose("load")
			if(!fs.existsSync(source)){
				logger.verbose("source not found", source)
				throw new Error("source file does not exists")
			}
			printer.loadFile(source)
			printer.webContents.on("did-finish-load", () => {
				logger.verbose("loaded ui")
				printer.webContents.printToPDF({
					printBackground: true,
					pageSize: "A4",
					landscape: false,
					...options,
				},(error, data) => {
					if (error) throw error
					logger.verbose("prepare to write")
					if (!fs.existsSync(path.dirname(destination)))
						fs.mkdirSync(path.dirname(destination), { recursive: true })
					fs.writeFile(destination, data, error => {
						if (error) throw error
						logger.verbose("written to", destination)
						printer.close()
						printer.destroy()
						resolve(destination)
					})
				})
			})
		})
		let result = await printComplete
		// @ts-ignore
		printer = null
		return result
	}
}