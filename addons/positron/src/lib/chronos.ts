import { Logger } from "@classes/CONSOLE"
import Thread from "webworker-threads"

const Console = new Logger(`chronos/positron`)
let jobs = {
	repeating: {} as Record<number, ({ fn: (args: any) => any, args: any })[]>,
	once: {} as Record<number, ({ fn: (args: any) => any, args: any })[]>
}
let ticks: Record<number, NodeJS.Timeout> = {}
/**
 * Schedule function execution
 *
 * @export
 * @class Chronos
 */
export default class Chronos {
	/**
	 * Called when the time has come
	 *
	 * @private
	 * @static
	 * @param {keyof typeof jobs} type job type
	 * @param {number} interval interval
	 * @memberof Chronos
	 */
	private static execute(type: keyof typeof jobs, interval: number) {
		let count = 0;
		(jobs[type][interval] || []).forEach(action => {
			try {
				count++
				action.fn(action.args)
			} catch (error) { Console.warn("chronos task threw an error",error, action ) }
		})
		Console.verbose(`${type} @ ${interval}ms finished ${count} tasks`)
	}

	/**
	 * Add a new Interval and set interval
	 *
	 * @private
	 * @static
	 * @param {number} interval interval
	 * @returns {NodeJS.Timeout} Timeout object
	 * @memberof Chronos
	 */
	private static newRepeat(interval: number): NodeJS.Timeout {
		jobs.repeating[interval] = []
		Console.verbose(`registered repeat every ${interval}ms`)
		ticks[interval] = setInterval(() => Chronos.execute("repeating", interval), interval)
		return ticks[interval]
	}
	/**
	 * Add a new timeout and set the timeout
	 *
	 * @private
	 * @static
	 * @param {number} interval interval
	 * @returns {NodeJS.Timeout}
	 * @memberof Chronos
	 */
	private static newOnce(interval: number): NodeJS.Timeout{
		jobs.once[interval] = []
		Console.verbose(`registered timeout in ${interval}ms`)
		return setTimeout(() => {
			Chronos.execute("once", interval)
			delete jobs.once[interval]
		}, interval)
	}

	/**
	 * Repeat a function at said interval on main thread
	 *
	 * @static
	 * @param {(args: any) => any} fn function
	 * @param {*} args arguments for function `fn`
	 * @param {number} interval interval
	 * @param {boolean} instant instant
	 * @memberof Chronos
	 */
	public static async Repeat(fn: (args: any) => any, args: any, interval: number, instant: boolean = false) {
		if (!jobs.repeating[interval]) Chronos.newRepeat(interval)
		jobs.repeating[interval].push({ fn, args })
		if(instant){
			try { fn(args) }
			catch (error) { Console.warn(`${fn.name} failed with args ${ args }.\n Error : ${error}`) }
		}
	}

	/**
	 * Execute a function at said interval on main thread
	 *
	 * @static
	 * @param {(args: any) => any} fn function
	 * @param {*} args arguments for function `fn`
	 * @param {number} interval interval
	 * @memberof Chronos
	 */
	public static async Once(fn: (args: any) => any, args: any, interval: number) {
		if (!jobs.once[interval]) Chronos.newOnce(interval)
		jobs.once[interval].push({ fn, args })
	}

	// FIXME: [Nikhil] requires testing if this is really in parallel
	// also a way to communicate result to main thread

	/**
	 * Repeat a function at said interval on seperate thread
	 *
	 * @static
	 * @param {(args: any) => any} fn function
	 * @param {*} args arguments for function `fn`
	 * @param {number} interval interval
	 * @param {boolean} instant instant
	 * @memberof Chronos
	 */
	public static async RepeatParallel(fn: (args: any) => any, args: any, interval: number, instant: boolean = false) {
		let threadedFn = () => new Thread.Worker(async () => {
			try { fn(args) }
			catch (error) { Console.warn(`threaded function failed silently with error`, error) }
		})
		Chronos.Repeat(threadedFn, undefined, interval, instant)
	}

	/**
	 * Execute a function at said interval on seperate thread
	 *
	 * @static
	 * @param {(args: any) => any} fn function
	 * @param {*} args arguments for function `fn`
	 * @param {number} interval interval
	 * @memberof Chronos
	 */
	public static async OnceParallel(fn: (args: any) => any, args: any, interval: number) {
		let threadedFn = () => new Thread.Worker(async () => {
			try { fn(args) }
			catch (error) { Console.warn(`threaded function failed silently with error`, error) }
		})
		Chronos.Once(threadedFn, undefined, interval)
	}
}
