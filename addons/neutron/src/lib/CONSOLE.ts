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

	private _source: string

	/**
	 * Creates an instance of Logger.
	 * @param {string} source name for log description
	 * @memberof Logger
	 */
	constructor(source: string){
		this._source = source
	}

	public log(...args){ console.info(chalk.blue(`${this._source} >>> `), Logger.INFO, ...args) }
	public okay(...args){ console.log(chalk.blue(`${this._source} >>> `), Logger.OKAY, ...args) }
	public info(...args){ console.info(chalk.blue(`${this._source} >>> `), Logger.INFO, ...args) }
	public warn(...args){ console.warn(chalk.blue(`${this._source} >>> `), Logger.WARN, ...args) }
	public error(...args){ console.error(chalk.blue(`${this._source} >>> `), Logger.ERROR, ...args) }
}