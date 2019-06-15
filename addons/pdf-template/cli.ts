#!/usr/bin/env node
import program from "commander"
import inquirer from "inquirer"
import { Logger } from "@classes/CONSOLE"
import { verifyNamespace, verifyFile, PDFDevServer } from "./pdf-dev"

Logger.Verbose = true
const Console = new Logger(`cli/pdf-template`)

class CLI {
	public static async menu() {
		let results: any = await inquirer.prompt([
			{
				type: "list",
				name: "menu",
				message: "Select Action for pdf-template addon: ",
				choices: Commands.map(command => command.name),
				default: Commands[0].name
			},
		])

		Commands.find(command => command.name === results.menu)!.action()
	}

	public static async dev(_namespace?: string, file?: string) {
		try {
			_namespace = await verifyNamespace(_namespace, { ask: true })
			file = await verifyFile(_namespace, file, { ask: true })
			let devServer = new PDFDevServer(_namespace, file)
			await devServer.start()
		} catch (error) {
			Console.error(error)
		}
	}

	public static async newTemplate(_namespace?: string) {
		try {
			PDFDevServer.New(_namespace)
		} catch (error) {
			Console.error(error)
		}
	}
}

const Commands: {
	name: string,
	command: string,
	description: string,
	action: (...args: any[]) => void
}[] = [
		{
			name: "dev server",
			command: "dev [namespace] [file]",
			description: "start a specific template with auto reload",
			action: CLI.dev
		},
		{
			name: "new template",
			command: "new [namespace]",
			description: "create a new template",
			action: CLI.newTemplate
		},
	]

Commands.forEach(command => program
	.command(command.command)
	.description(command.description)
	.action(command.action)
)

program
	.command("help")
	.description("show help")
	.action(() => { program.help() })

program
	.description("CLI to interact with pdf-templates")
	.version("1.0.0", "-v,--version")
	.parse(process.argv)

if (program.args.length === 0) CLI.menu()
