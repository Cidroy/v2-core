import path from "path"
import { resolve } from "./resolve"
/**
 * TODO: auto import all the template and assets based on the following
 * `@plugins/{namespace}/pdf-template` is needed for this addon to auto detect assets and templates
 * `@plugins/{namespace = [folder name]}`
 * `@plugins/{namespace}/pdf-template/templates` for templates
 * `@plugins/{namespace}/pdf-template/assets` for assets
 * `@plugins/{namespace}/pdf-template/index.ts` for additional config in future
 */

export const config = {
	templates: {
		core: resolve("plugins/core/pdf-template/templates"),
		gymkonnect: resolve("plugins/gymkonnect/pdf-template/templates"),
	},
	assets: [
		resolve("plugins/core/pdf-template/assets/css"),
	]
}

let _reports_folder: string | null = null
export const REPORTS_FOLDER = async () => {
	if(_reports_folder!==null) return _reports_folder
	if (process.env.NODE_ENV === "production") {
		const AppConfig = require("@classes/appConfig").default
		_reports_folder = path.join(AppConfig.DataFolder, "/reports")
	} else {
		_reports_folder = resolve("dist/reports")
	}
	return _reports_folder
}

export const BASEPATH = async () => {
	if (process.env.NODE_ENV === "production") {
		const AppConfig = require("@classes/appConfig").default
		await AppConfig.Initialize()
		let base = await AppConfig.Get("__dirname", "")
		return path.join(base, "/resources/templates")
	} else {
		return ""
	}
}

export const SUPPORTED_EXTENSIONS = ["twig",]
export const DEFAULT_EXTENSION = "twig"
