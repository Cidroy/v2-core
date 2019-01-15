import chalk from "chalk"
/**
 * Logger proxy class for positron
 * TODO: use some awesome logger in production
 * @export
 * @class Logger
 */
export class Logger{
	public static OKAY = chalk.bgGreen("OKAY")
	public static INFO = chalk.bgBlue("INFO")
	public static WARN = chalk.bgYellow("WARN")
	public static ERROR = chalk.bgRed("ERR ")
	public static VERBOSE = chalk.gray("VERB")

	private _source: string

	/**
	 * Creates an instance of Logger.
	 * @param {string} source name for log description
	 * @memberof Logger
	 */
	constructor(source: string){
		this._source = source
	}

	public log(...args: any[]){ console.info(chalk.blue(`${this._source} >>> `), Logger.INFO, ...args) }
	public okay(...args: any[]){ console.log(chalk.blue(`${this._source} >>> `), Logger.OKAY, ...args) }
	public info(...args: any[]){ console.info(chalk.blue(`${this._source} >>> `), Logger.INFO, ...args) }
	public warn(...args: any[]){ console.warn(chalk.blue(`${this._source} >>> `), Logger.WARN, ...args) }
	public error(...args: any[]){ console.error(chalk.blue(`${this._source} >>> `), Logger.ERROR, ...args) }
	public verbose(...args: any[]){ console.info(chalk.blue(`${this._source} >>> `), Logger.VERBOSE, ...args) }
}