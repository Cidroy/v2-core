let LogPrefixColor = {
	OKAY: "OKAY",
	INFO: "INFO",
	WARN: "WARN",
	ERROR: "ERR ",
	VERBOSE: "VERB",

	PREFIX: (prefix: string) => `${prefix} >>> `
}

// #!if !web
import chalk from "chalk"
LogPrefixColor = {
	OKAY : chalk.bgGreen("OKAY"),
	INFO : chalk.bgBlue("INFO"),
	WARN : chalk.bgYellow("WARN"),
	ERROR : chalk.bgRed("ERR "),
	VERBOSE : chalk.gray("VERB"),

	PREFIX:  (prefix: string) => chalk.blue(`${prefix} >>> `)
}
// #!endif

let verbosity = false

/**
 * Logger proxy class for positron
 * TODO: use some awesome logger in production
 * @export
 * @class Logger
 */
export class Logger{
	public static get Verbose(){ return verbosity }
	public static set Verbose(value: boolean){ verbosity = value }

	private _source: string

	/**
	 * Creates an instance of Logger.
	 * @param {string} source name for log description
	 * @memberof Logger
	 */
	constructor(source: string){
		this._source = source
	}

	public log(...args: any[]){ console.info(this.prefix, LogPrefixColor.INFO, ...args) }
	public okay(...args: any[]){ console.log(this.prefix, LogPrefixColor.OKAY, ...args) }
	public info(...args: any[]){ console.info(this.prefix, LogPrefixColor.INFO, ...args) }
	public warn(...args: any[]){ console.warn(this.prefix, LogPrefixColor.WARN, ...args) }
	public error(...args: any[]){ console.error(this.prefix, LogPrefixColor.ERROR, ...args) }
	public verbose(...args: any[]){
		if (!Logger.Verbose) return
		console.info(this.prefix, LogPrefixColor.VERBOSE, ...args)
	}

	public get prefix() { return LogPrefixColor.PREFIX(this._source) }
}
