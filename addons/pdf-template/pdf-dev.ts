import path from "path"
import fs from "fs-extra"
import os from "os"
import inquirer from "inquirer"
import reload from "reload"
import express from "express"
import JSON5 from "json5"
import http from "http"
import Twig from "twig"
import { AddressInfo } from "net"
import launchEditor from "launch-editor"
import { config } from "~/config/addons.pdf-template"
import ElectronPDF from "./electron-pdf"
import { Logger } from "@classes/CONSOLE"
import env from "~/config/env"

const Console = new Logger(`pdf-dev/pdf-template`)
const resolve = (_namespace: string, file: string) => path.join(config.templates[_namespace], `/${file}.${ElectronPDF.TEMPLATE_EXTENSION}`)

export async function verifyNamespace(_namespace: string | undefined, options: { ask?: boolean } = {}): Promise<string> {
	options = {
		ask: false,
		...options,
	}

	if (_namespace === undefined) {
		if (!options.ask) throw "Please provide namespace"
		let results: any = await inquirer.prompt([
			{
				type: "list",
				name: "namespace",
				message: "Select namespace: ",
				choices: Object.keys(config.templates),
				default: Object.keys(config.templates)[0],
			},
		])
		_namespace = <string>results.namespace
	}

	if (!Object.keys(config.templates).includes(_namespace)) throw "Invalid namespace"

	return _namespace
}

export async function verifyFile(_namespace: string, file: string | undefined, options: { ask?: boolean } = {}): Promise<string> {
	options = {
		ask: false,
		...options,
	}

	if (file === undefined) {
		if (!options.ask) throw "Please provide file"
		let results: any = await inquirer.prompt([
			{
				type: "input",
				name: "file",
				message: "file: ",
				default: "test",
			},
		])
		file = <string>results.file
	}
	let finalPath = resolve(_namespace, file)
	if (!fs.existsSync(finalPath)) throw "Invalid file"
	return file
}

export class PDFDevServer {
	public static async New(_namespace?: string){
		try {
			_namespace = await verifyNamespace(_namespace, { ask: true })
			let file: string | undefined = undefined
			while (file === undefined) {
				let results: any = await inquirer.prompt([
					{
						type: "input",
						name: "file",
						message: "Enter twig template name: ",
					},
				])
				file = <string>results.file
				if (fs.existsSync(resolve(_namespace, file))) {
					Console.warn("Twig template already exists")
					file = undefined
				}
			}
			file = resolve(_namespace, file)
			fs.copyFileSync(
				path.join(__dirname, "/template.twig"),
				file
			)
			if (!fs.existsSync(file)) throw `Unable to write template to ${file}`
			Console.okay(`Wrote template ${_namespace}/${file}`)
		} catch (error) {
			Console.error("Unable to create new template", error)
		}
	}

	private _namespace: string
	private _file: string
	private _source: string
	private _dataSource: string
	private app: express.Application
	private reload: () => void = () => { }

	private async openDataFile() {
		try {
			let defaultData = {}
			if (!fs.existsSync(this._dataSource)) {
				if (fs.existsSync(this._source)) {
					let dataStr = fs.readFileSync(this._source, "utf8")
					let regex = new RegExp("(?<=(<script\\s+lang=.json5.>))(\\w|\\d|\\n|[().,\\-:;@#$%^&*\\[\\]\"'+–/\\/®°⁰!?\\{}|`~]|\\s+)+?(?=(<\\/script>))")
					let result = regex.exec(dataStr)
					if(result===null) dataStr = "{}"
					else dataStr = result[0]
					defaultData = JSON5.parse(dataStr)
				}
				fs.writeFileSync(this._dataSource, JSON5.stringify(defaultData))
			}
			launchEditor(
				this._dataSource,
				env.dev.editor,
			)
		} catch (error) {
			Console.error("Open Data File", error)
		}
	}
	private get data() {
		let data = ""
		data = fs.readFileSync(this._dataSource, "utf8")
		return JSON5.parse(data)
	}

	private async attachIndex() {
		const Twig = await import("twig")
		this.app.get("/", async (req, res) => {
			let html = ""
			try {
				Console.verbose("TWIG", "starting to render", { source: this._source, data: this.data })
				if (!fs.existsSync(this._source)) throw `source file not found "${this._source}"`
				else {
					const template = Twig.twig({
						data: fs.readFileSync(this._source, "utf8")
					})
					html = await template.renderAsync(this.data)
					Console.verbose("TWIG Done")
				}
			} catch (error) {
				Console.error("twig render", error)
				html = "<body>RENDER FAILED</body>"
			}
			res.send(html.replace("</body>", "<script src='/reload/reload.js'></script></body>"))
		})
	}

	private async attachAssets() {
		config.assets.forEach(asset => {
			this.app.use(`/${path.basename(asset)}`, express.static(asset))
		})
	}

	private async attachReload() {
		let reloadReturned = await reload(this.app)
		this.reload = reloadReturned.reload
	}

	private async watch() {
		const NewFileWatcher = (source: string) => fs.watch(source, {
			persistent: false,
			recursive: true,
		}, () => { this.reload() })
		const fileWatchers: Record<string, fs.FSWatcher[]> = {
			namespace: [NewFileWatcher(config.templates[this._namespace]),],
			data: [NewFileWatcher(this._dataSource),],
			assets: config.assets.map(NewFileWatcher)
		}
	}

	private async openBrowser(port: number) {
		const open = require("open")
		open(`http://localhost:${port}`)
	}

	constructor(_namespace: string, file: string) {
		this._namespace = _namespace
		this._file = file
		Console.verbose(`initialized for ${_namespace}/${file}`)

		this.app = express()
		this._dataSource = path.join(os.tmpdir(), `${_namespace}/${file}`.replace(/[^a-zA-Z0-9]/g, "-") + ".json5")
		this._source = ""
	}

	public async start() {
		try {
			Console.verbose("starting dev server")
			await Promise.all([
				verifyNamespace(this._namespace),
				verifyFile(this._namespace, this._file),
			])
			this._source = resolve(this._namespace, this._file)

			await this.openDataFile()
			await Promise.all([
				this.attachAssets(),
				this.attachReload(),
				this.attachIndex(),
			])

			this.watch()

			let server = http.createServer(this.app)
			server.listen(0, () => {
				let port = (<AddressInfo>server.address()).port
				Console.okay(`Serving '${this._namespace}/${this._file}' on http://localhost:${port}`)
				Console.info(`Data File: ${this._dataSource}`)
				this.openBrowser(port)
			})
			server.on("error", error => { throw error })
		} catch (error) {
			Console.error("Unable to start server", error)
			throw error
		}
	}
}
