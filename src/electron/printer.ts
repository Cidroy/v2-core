import { BrowserWindow, PrintToPDFOptions, ipcRenderer as ipc } from "electron"
import fs from "fs-extra"
import os from "os"
import uuid from "uuid"
import path from "path"
import Twig from "twig"
import { Logger } from "@classes/CONSOLE"
import AppConfig from "@classes/appConfig"

/**
 * Print helper class
 *
 * @export
 * @class Printer
 */
export default class Printer{
	private static log = new Logger("electron/printer")
	/**
	 * Timout for pdf printing
	 * TODO: make this from config
	 *
	 * @readonly
	 * @private
	 * @static
	 * @memberof Printer
	 */
	private static get TIMEOUT(){ return 1000 * 60 }
	/**
	 * Default template extension
	 * TODO: make this updatable
	 *
	 * @readonly
	 * @static
	 * @memberof Printer
	 */
	public static get TEMPLATE_EXTENSION(){ return "twig" }

	/**
	 * Render File using twig renderer
	 *
	 * @private
	 * @static
	 * @param {string} source full path to source template
	 * @param {*} [data={}] render data
	 * @returns rendered html
	 * @memberof Printer
	 */
	private static async fileRenderer(source: string, data = {}){
		let renderPromise = new Promise<string>((resolve, reject) => {
			Twig.renderFile(source, <any>data, (err, result) => {
				if(err){
					reject(err)
					return
				}
				resolve(result)
			})
		})
		return await renderPromise
	}

	/**
	 * Render template in `resources/templates/**` and return output
	 * stores a copy html in temp directory
	 *
	 * @static
	 * @param {string} templateName template name
	 *
	 * **NOTE :** do not write file extension
	 * @param {*} [data={}] render data
	 * @returns {Promise<{ filePath: string, html: string }>} temporary file filepath and rendered html
	 * @memberof Printer
	 */
	public static async renderTemplate(templateName: string, data = {}): Promise<{ filePath: string, html: string }>{
		let id = uuid()
		let logger = new Logger(`render#${id}@${Printer.log.prefix}`)
		logger.verbose("render", templateName, data)
		let basepath = await AppConfig.Get("__dirname", "")
		let source = path.resolve(basepath, "resources/templates" , templateName + "." + Printer.TEMPLATE_EXTENSION)
		let html = await Printer.fileRenderer(source, data)

		let filePath = path.resolve(os.tmpdir(), templateName + "-" + id + ".html")
		await fs.writeFile(filePath, html)
		return { filePath, html }
	}

	/**
	 * Render template and save as pdf
	 *
	 * **source :** `resources/templates/**.twig`
	 *
	 * **destination :** `{AppConfig.DataFolder}/reports/**.pdf`
	 *
	 * @static
	 * @param {string} templateName template name
	 *
	 * **NOTE :** Do not pass file extension
	 * @param {string} outputName output file name
	 *
	 * **NOTE :** Do not pass file extension
	 *
	 * Defaults to `.pdf`
	 * @param {*} [renderData={}] render data
	 * @param {PrintToPDFOptions} [printOptions={}] printing options
	 * @returns output file path
	 * @memberof Printer
	 */
	public static async renderAndPrintPDF(templateName: string, outputName: string, renderData = {}, printOptions: PrintToPDFOptions = {}){
		let { filePath } = await Printer.renderTemplate(templateName, renderData)
		let outputFile = path.resolve(AppConfig.DataFolder, "reports", outputName + ".pdf")
		await Printer.requestPrintPDF(filePath, outputFile, printOptions)
		return outputFile
	}

	/**
	 * Request to print pdf
	 *
	 * @static
	 * @param {string} source absolute source path
	 * @param {string} destination absolute destination path
	 * @param {PrintToPDFOptions} [options={}] print options
	 * @memberof Printer
	 */
	public static async requestPrintPDF(source: string, destination: string, options: PrintToPDFOptions = {}){
		let id = uuid()
		let logger = new Logger(`pdf#${id}@${Printer.log.prefix}`)
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

	/**
	 * **Do not use this function.**
	 * This is meant for main thread only.
	 *
	 * **Use `Printer.requestPrintPDF` instead**
	 *
	 * Print PDF which is requested
	 * @static
	 * @param {string} id print id
	 * @param {BrowserWindow} printer Browser Window for render and printing
	 * @param {string} source absolute source path
	 * @param {string} destination absolute destination path
	 * @param {PrintToPDFOptions} [options={}] printing options
	 * @returns file path tp pdf
	 * @memberof Printer
	 */
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