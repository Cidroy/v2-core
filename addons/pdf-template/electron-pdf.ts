import uuid from "uuid"
import path from "path"
import fs from "fs-extra"
import os from "os"
import { PrintToPDFOptions, ipcRenderer as ipc, BrowserWindow as ElectronBrowserWindow } from "electron"
import { Logger } from "@classes/CONSOLE"
import { config, BASEPATH, REPORTS_FOLDER, DEFAULT_EXTENSION, SUPPORTED_EXTENSIONS } from "~/config/addons.pdf-template"

const resolveSource = async (_namespace: string, _document: string, extension: string) => {
	if (process.env.NODE_ENV === "production")
		return path.join(await BASEPATH(), `/${_namespace}/${_document}.${extension}`)
	else
		return path.join(config.templates[_namespace], `/${_document}.${extension}`)
}

export default class ElectronPDF {
	public static readonly TEMPLATE_EXTENSION = DEFAULT_EXTENSION
	private static readonly TIMEOUT = 60 * 1000

	private _id: string
	private _namespace: string
	private _document: string
	private _log: Logger
	private _timeout: number
	private _extension: string

	constructor(
		namespace: string,
		document: string,
		{ timeout = ElectronPDF.TIMEOUT, extension = ElectronPDF.TEMPLATE_EXTENSION }: { timeout?: number; extension?: string; } = {}
	) {
		this._id = uuid().split("-")[0]
		this._namespace = namespace
		this._document = document
		this._timeout = timeout
		this._extension = extension
		this._log = new Logger(`${namespace}/${document}#${this._id}@addon/electron-pdf`)
		this._log.verbose("new")
	}

	public async save(destination: string | null, data: object = {}, printOptions: PrintToPDFOptions = {}) {
		if (destination === null) {
			let date = (new Date()).toLocaleDateString().replace(/[^a-zA-Z0-9]/g, "-")
			destination = path.join(await REPORTS_FOLDER(), `/${this._document} ${date}.pdf`)
		}
		// #region increment file number if file already exists
		let split = destination.lastIndexOf(".")
		let i = 0
		let temp_destination = destination
		while (fs.existsSync(temp_destination)) {
			i++
			temp_destination = [
				destination.slice(0, split),
				` (${i})`,
				destination.slice(split),
			].join("")
		}
		destination = temp_destination
		// #endregion
		this._log.verbose("render & print", `${this._document}/${this._namespace}`, "to", destination)
		let { filePath: renderedFile } = await ElectronPDF.renderTemplate(this._namespace, this._document, data, { id: this._id })
		await ElectronPDF.requestPrintPDF(renderedFile, destination, printOptions, { id: this._id })
		return destination
	}

	/**
	 * Request to print pdf
	 *
	 * @static
	 * @param {string} source absolute source path
	 * @param {string} destination absolute destination path
	 * @param {PrintToPDFOptions} [options={}] print options
	 * @memberof ElectronPDF
	 */
	public static async requestPrintPDF(
		source: string,
		destination: string,
		options: PrintToPDFOptions = {},
		{
			id = uuid(),
			extension = ElectronPDF.TEMPLATE_EXTENSION,
		}: {
			id?: string,
			extension?: string,
		} = {}
	) {
		let logger = new Logger(`pdf#${id}@addon/electron-pdf`)
		logger.verbose("new job")
		await new Promise((resolve, reject) => {
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
				fs.remove(source)
				resolve(data)
			})
			ipc.once(`failed-pdf-${id}`, (event, error) => {
				logger.verbose("job failed")
				fs.remove(source)
				reject(error)
			})
			setTimeout(() => {
				logger.verbose("job timedout")
				reject(new Error("PDF Writing Timedout"))
				fs.remove(source)
			}, ElectronPDF.TIMEOUT)
		})
	}

	/**
	 * Render template in `resources/templates/**` and return output
	 * stores a copy html in temp directory
	 *
	 * @static
	 * @param {string} _document template name
	 * **NOTE :** do not write file extension
	 *
	 * @param {*} [data={}] render data
	 * @param {{ id: string }} [options={ id: uuid }] additional options
	 * @returns {Promise<{ filePath: string, html: string }>} temporary file filepath and rendered html
	 * @memberof ElectronPDF
	 */
	public static async renderTemplate(
		_namespace: string,
		_document: string,
		data: any = {},
		{
			id = uuid(),
			extension = ElectronPDF.TEMPLATE_EXTENSION,
		}: {
			id?: string,
			extension?: string,
		} = {}
	): Promise<{ filePath: string, html: string }> {
		let logger = new Logger(`render#${id}@addon/electron-pdf`)
		logger.verbose("render", `/${_namespace}/${_document}`, data)
		let source = await resolveSource(_namespace, _document, extension)
		logger.verbose("source: ", source)
		let filePath = path.resolve(os.tmpdir(), _document.replace(/(\/+|\\+)/, "-") + `-${id}.rendered.html`)
		let directory = path.dirname(filePath)

		let [html,] = await Promise.all([
			ElectronPDF.fileRenderer(source, data, logger),
			fs.ensureDir(directory),
		])

		await Promise.all([
			ElectronPDF.copyAssets(directory),
			fs.writeFile(filePath, html),
		])
		return { filePath, html }
	}

	/**
	 * Render File using twig renderer
	 *
	 * @private
	 * @static
	 * @param {string} source full path to source template
	 * @param {*} [data={}] render data
	 * @returns rendered html
	 * @memberof ElectronPDF
	 */
	private static async fileRenderer(source: string, data: any = {}, logger: Logger) {
		return new Promise<string>(async (resolve, reject) => {
			const Twig = await import("twig")
			logger.verbose("TWIG", "starting to render", { source, data })
			if (!fs.existsSync(source)) reject(`source file not found "${source}"`)
			else Twig.renderFile(source, <any>data, (error, result) => {
				if (error) {
					logger.error("TWIG", "failed", error)
					reject(error)
				}
				else {
					logger.verbose("TWIG", "done")
					resolve(result)
				}
			})
		})
	}

	/**
	 * Copy all assets saved in config to the destination
	 * FIXME: add integrity check by using hash to test if assets already exists
	 * copy only if hash match fails
	 * hash source to be the source of all assets
	 * @private
	 * @static
	 * @param {string} destination full path to asset destination folder
	 * @returns
	 * @memberof ElectronPDF
	 */
	private static async copyAssets(destination: string) {
		let promises: Promise<any>[] = []
		if (process.env.NODE_ENV === "production") {
			promises.push(new Promise(async (resolve, reject) => {
				await fs.copy(await BASEPATH(), destination, {
					filter: _path => {
						let regex = new RegExp(`.*(${SUPPORTED_EXTENSIONS.map(i => `.${i}`).join("|")})$`)
						return !regex.test(_path)
					}
				})
				resolve(true)
			}))
		} else {
			config.assets.forEach(asset => promises.push(new Promise(async (resolve, reject) => {
				await fs.copy(asset, path.join(destination, path.basename(asset)), {
					overwrite: true,
					errorOnExist: false,
				})
				resolve(true)
			})))
		}
		await Promise.all(promises)
		return true
	}

	/**
	 * **Do not use this function.**
	 * This is meant for main thread only.
	 *
	 * **Use `ElectronPDF.requestPrintPDF` instead**
	 *
	 * Print PDF which is requested
	 * @static
	 * @param {string} id print id
	 * @param {ElectronBrowserWindow} printer Browser Window for render and printing
	 * @param {string} source absolute source path
	 * @param {string} destination absolute destination path
	 * @param {PrintToPDFOptions} [options={}] printing options
	 * @returns file path tp pdf
	 * @memberof ElectronPDF
	 */
	public static async _generate_pdf_on_main(id: string, printer: ElectronBrowserWindow, source: string, destination: string, options: PrintToPDFOptions = {}) {
		let logger = new Logger(`pdf-gen#${id}@addon/electron-pdf`)
		logger.verbose("print", source, "to", destination, "options:", options)
		let printComplete = new Promise<string>((resolve, reject) => {
			logger.verbose("load")
			if (!fs.existsSync(source)) {
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
				}, (error, data) => {
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

	/**
	 * Attach pdf generation function to the main process
	 *
	 * @static
	 * @param {Electron.IpcMain} ipcMain ipcMain of main process
	 * @param {Logger} logger logger of main
	 * @memberof ElectronPDF
	 */
	public static async Attach(
		{ ipcMain, BrowserWindow = ElectronBrowserWindow, logger }:
			{ ipcMain: Electron.IpcMain; BrowserWindow?: typeof ElectronBrowserWindow; logger: Logger; }
	) {
		ipcMain.on("print-to-pdf", async (event, args) => {
			try {
				logger.verbose("pdf print request", args.id)
				let printer: ElectronBrowserWindow = new BrowserWindow({ show: false })
				let result = await ElectronPDF._generate_pdf_on_main(args.id, printer, args.source, args.destination, args.options || {})
				event.sender.send(`wrote-pdf-${args.id}`, result)
			} catch (error) {
				logger.error("pdf print failed", error)
				event.sender.send(`failed-pdf-${args.id}`, error)
			}
		})
	}

	public static async REPORTS_FOLDER(){ return await REPORTS_FOLDER() }
}
