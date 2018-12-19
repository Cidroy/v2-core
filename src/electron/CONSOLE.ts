import chalk from "chalk"
export class Logger{
	public static OKAY = chalk.bgGreen("OKAY")
	public static INFO = chalk.bgBlue("INFO")
	public static WARN = chalk.bgYellow("WARN")
	public static ERROR = chalk.bgRed("ERR ")

	private _source: string

	constructor(source: string){
		this._source = source
	}

	public log(...args){ console.info(chalk.blue(`${this._source} >>> `), Logger.INFO, ...args) }
	public okay(...args){ console.log(chalk.blue(`${this._source} >>> `), Logger.OKAY, ...args) }
	public info(...args){ console.info(chalk.blue(`${this._source} >>> `), Logger.INFO, ...args) }
	public warn(...args){ console.warn(chalk.blue(`${this._source} >>> `), Logger.WARN, ...args) }
	public error(...args){ console.error(chalk.blue(`${this._source} >>> `), Logger.ERROR, ...args) }
}