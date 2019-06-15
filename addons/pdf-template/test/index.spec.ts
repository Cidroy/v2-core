import os from "os"

import { resolve } from "~/config/resolve"
import PrinterTemplateBuilder from ".."

jest.setTimeout(30000)

describe("index", () => {
	test("basic template", async done => {
		let printerTemplateBuilder = new PrinterTemplateBuilder(os.tmpdir(), os.platform())
		await printerTemplateBuilder.build()
		expect(true).toBe(true)
		done()
	})

	test("templates imported from plugin", async done => {
		let printerTemplateBuilder = new PrinterTemplateBuilder(os.tmpdir(), os.platform())
		printerTemplateBuilder.addTemplates({
			gymkonnect: resolve("plugins/core/pdf-template/templates"),
		})
		await printerTemplateBuilder.build()
		expect(true).toBe(true)
		done()
	})

	test("templates and assets imported using config", async done => {
		let printerTemplateBuilder = new PrinterTemplateBuilder(os.tmpdir(), os.platform())
		await printerTemplateBuilder.useConfig()
		await printerTemplateBuilder.build()
		expect(true).toBe(true)
		done()
	})
})
