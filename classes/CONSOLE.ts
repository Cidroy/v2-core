import chalk from "chalk"

export class LogPrefixColor{
	public static readonly OKAY = chalk.bgGreen("OKAY")
	public static readonly INFO = chalk.bgBlue("INFO")
	public static readonly WARN = chalk.bgYellow("WARN")
	public static readonly ERROR = chalk.bgRed("ERR ")
	public static readonly VERBOSE = chalk.gray("VERB")
}

/**
 * Logger proxy class for positron
 * TODO: use some awesome logger in production
 * @export
 * @class Logger
 */
export class Logger{
	public static Verbose: boolean = false

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

	public get prefix() { return chalk.blue(`${this._source} >>> `) }
}