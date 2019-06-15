import os from "os"
import path from "path"
import fs from "fs-extra"

import ElectronPDF from "../electron-pdf"
import { BASEPATH, REPORTS_FOLDER } from "~config/addons.pdf-template"
import { Logger } from "@classes/CONSOLE"
import { resolve } from "~/config/resolve"

Logger.Verbose = true
const Console = new Logger("electron-pdf.spec/test")

// DEVELOPMENT TESTS
describe(
	"electron-pdf-dev",
	() => {
		const remote = require("electron").remote
		const Window = remote.getCurrentWindow()

		let location = ""
		let location2 = ""
		let customLocation = path.join(os.tmpdir(), "/custom-test.pdf")
		let pdf: ElectronPDF

		beforeAll(() => {
			process.env.NODE_ENV = "development"
			return true
		})

		test("is development", async done => {
			expect(process.env.NODE_ENV).toEqual("development")
			Console.okay("development")
			Console.verbose({
				BASEPATH: await BASEPATH(),
				REPORTS_FOLDER: await REPORTS_FOLDER(),
			})
			done()
		})

		test("electron ready", async done => {
			try {
				expect(Window).toBeTruthy()
				const index = resolve("dist/index.html")
				if (!fs.existsSync(index))
					fs.writeFileSync(index, "THIS IS A TEST")

				expect(fs.existsSync(index)).toBeTruthy()
				Window.loadURL(index)

			} catch (error) {
				Console.error(error)
			}
			done()
		})

		test("ElectronPDF.Attach", async done => {
			expect(remote.ipcMain).toBeDefined()
			ElectronPDF.Attach({
				ipcMain: remote.ipcMain,
				BrowserWindow: remote.BrowserWindow,
				logger: new Logger("electron/test")
			})
			expect(true).toBeTruthy()
			done()
		})

		test("render and save `core/test` in reports folder", async done => {
			try {
				pdf = new ElectronPDF("core", "test")
				location = await pdf.save(null, { name: "ELECTRON-PDF-TEST" })
			} catch (error) {
				Console.error(error)
			}
			expect(fs.existsSync(location)).toBeTruthy()
			done()
		})

		test("auto increment file name if already exists", async done => {
			try {
				pdf = new ElectronPDF("core", "test")
				location2 = await pdf.save(null, { name: "ELECTRON-PDF-TEST" })
				// check if file exists
				expect(fs.existsSync(location2)).toBeTruthy()
				Console.verbose({
					location,
					location2,
				})
				// check if both locations do not match
				expect(location2).not.toEqual(location)
				fs.removeSync(location2)
				// confirm file has been deleted
				expect(fs.existsSync(location2)).not.toBeTruthy()
			} catch (error) {
				Console.error(error)
			}
			done()
		})

		test("saves pdf to specified location", async done => {
			try {
				pdf = new ElectronPDF("core", "test")
				if (fs.existsSync(customLocation))
					fs.removeSync(customLocation)
				// make sure the file doesn't exists already
				expect(fs.existsSync(customLocation)).not.toBeTruthy()
				location2 = await pdf.save(customLocation, { name: "ELECTRON-PDF-TEST" })
				Console.verbose({
					customLocation,
					location2,
				})
				// check if the system saved the pdf anywhere
				expect(fs.existsSync(location2)).toBeTruthy()
				// check if the custom and final location matches
				expect(customLocation).toEqual(location2)
			} catch (error) {
				Console.error(error)
			}
			done()
		})

		test("All Complete", done => {
			Console.verbose("")
			Console.verbose("")
			Console.verbose("")
			Console.verbose("")
			Console.verbose("")
			Console.verbose("")
			Console.verbose("DONE")
			done()
		})

		afterAll(async done => {
			if (fs.existsSync(location)) await fs.remove(location)
			if (fs.existsSync(location2)) await fs.remove(location2)
			done()
		})
	}
)

// PRODUCTION TESTS
describe(
	"electron-pdf-prod",
	() => {
		const remote = require("electron").remote
		const Window = remote.getCurrentWindow()

		let location = ""
		let location2 = ""
		let customLocation = path.join(os.tmpdir(), "/custom-test.pdf")
		let pdf: ElectronPDF

		beforeAll(() => {
			process.env.NODE_ENV = "production"
			return true
		})

		test("is production", async done => {
			expect(process.env.NODE_ENV).toEqual("production")
			Console.okay("production")
			Console.verbose({
				BASEPATH: await BASEPATH(),
				REPORTS_FOLDER: await REPORTS_FOLDER(),
			})
			done()
		})

		test("electron ready", async done => {
			try {
				expect(Window).toBeTruthy()
				const index = resolve("dist/index.html")
				if (!fs.existsSync(index))
					fs.writeFileSync(index, "THIS IS A TEST")

				expect(fs.existsSync(index)).toBeTruthy()
				Window.loadURL(index)

			} catch (error) {
				Console.error(error)
			}
			done()
		})

		test("ElectronPDF.Attach", async done => {
			expect(remote.ipcMain).toBeDefined()
			ElectronPDF.Attach({
				ipcMain: remote.ipcMain,
				BrowserWindow: remote.BrowserWindow,
				logger: new Logger("electron/test")
			})
			expect(true).toBeTruthy()
			done()
		})

		test("build", async done => {
			try {
				const PrinterTemplateBuilder = (await import("..")).default
				let printerTemplateBuilder = new PrinterTemplateBuilder(resolve("bin"), os.platform())
				await printerTemplateBuilder.useConfig()
				let destination = await printerTemplateBuilder.build()
				Console.verbose(destination)
				expect(true).toBeTruthy()
			} catch (error) {
				Console.error(error)
				expect(false).toBeTruthy()
			}
			done()
		}, 5 * 60 * 1000)

		test("render and save `core/test` in reports folder", async done => {
			try {
				pdf = new ElectronPDF("core", "test")
				location = await pdf.save(null, { name: "ELECTRON-PDF-TEST" })
			} catch (error) {
				Console.error(error)
			}
			expect(fs.existsSync(location)).toBeTruthy()
			done()
		})

		test("auto increment file name if already exists", async done => {
			try {
				pdf = new ElectronPDF("core", "test")
				location2 = await pdf.save(null, { name: "ELECTRON-PDF-TEST" })
				// check if file exists
				expect(fs.existsSync(location2)).toBeTruthy()
				Console.verbose({
					location,
					location2,
				})
				// check if both locations do not match
				expect(location2).not.toEqual(location)
				fs.removeSync(location2)
				// confirm file has been deleted
				expect(fs.existsSync(location2)).not.toBeTruthy()
			} catch (error) {
				Console.error(error)
			}
			done()
		})

		test("saves pdf to specified location", async done => {
			try {
				pdf = new ElectronPDF("core", "test")
				if (fs.existsSync(customLocation))
					fs.removeSync(customLocation)
				// make sure the file doesn't exists already
				expect(fs.existsSync(customLocation)).not.toBeTruthy()
				location2 = await pdf.save(customLocation, { name: "ELECTRON-PDF-TEST" })
				Console.verbose({
					customLocation,
					location2,
				})
				// check if the system saved the pdf anywhere
				expect(fs.existsSync(location2)).toBeTruthy()
				// check if the custom and final location matches
				expect(customLocation).toEqual(location2)
			} catch (error) {
				Console.error(error)
			}
			done()
		})

		test("All Complete", done => {
			Console.verbose("")
			Console.verbose("")
			Console.verbose("")
			Console.verbose("")
			Console.verbose("")
			Console.verbose("")
			Console.verbose("DONE")
			done()
		})

		afterAll(async done => {
			if (fs.existsSync(location)) await fs.remove(location)
			if (fs.existsSync(location2)) await fs.remove(location2)
			done()
		})
	}
)
