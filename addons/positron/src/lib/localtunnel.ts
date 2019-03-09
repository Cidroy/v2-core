import localtunnel from "localtunnel"
import { Logger } from "@classes/CONSOLE"
import AppConfig from "@classes/appConfig"
import uuid from "uuid"

const Console = new Logger(`positron/localtunnel`)
// tslint:disable-next-line: ban-types
let tunnel: null | ReturnType<typeof localtunnel> = null

/**
 * Create localtunnel for the port
 *
 * Single instance only per project
 *
 * @export
 * @class Tunnel
 */
export class Tunnel {
	private static readonly Namespace = "positron/localtunnel"
	private static readonly DefaultOptions = {
		subdomain: "positron-" + uuid().split("-")[0]
	}

	/**
	 * Start the localtunnel
	 *
	 * @static
	 * @param {number} port port to forward
	 * @param {string} [subdomain] subdomain name, will default to appconfig otherwise.
	 * @returns localtunnel url
	 * @memberof Tunnel
	 */
	public static async Start(port: number, subdomain?: string) {
		if(!subdomain){
			let options = await AppConfig.GetSet(Tunnel.Namespace, Tunnel.DefaultOptions)
			subdomain = options.subdomain
		}
		return new Promise<string>((resolve, reject) => {
			tunnel = localtunnel(
				port,
				{ subdomain },
				(error: any, _tunnel: any) => {
					if (error){
						Console.error(error)
						reject(error)
					}
					else {
						resolve(tunnel.url)
						Tunnel.onClose(() => Console.info("Localtunnel closed"))
						Tunnel.onError(error => Console.error(error))
						Tunnel.onRequest(request => Console.verbose(request.method, request.path))
					}
				}
			)
		})
	}

	/**
	 * Close the localtunnel
	 *
	 * @static
	 * @memberof Tunnel
	 */
	public static Close(){ tunnel && tunnel.close && tunnel.close() }

	/**
	 * Get the Url of the localtunnel
	 *
	 * return null if the tunnel is not ready
	 *
	 * @readonly
	 * @static
	 * @type {(string | null)}
	 * @memberof Tunnel
	 */
	public static get Url(): string | null { return (tunnel && tunnel.url) || null }

	/**
	 * Event handler when request is received
	 *
	 * @static
	 * @param {(request: { method: string, path: string }) => any} fn event handler
	 * @memberof Tunnel
	 */
	public static onRequest(fn: (request: { method: string, path: string }) => any) {
		if (tunnel === null) {
			Console.error("Tunnel was not ready for onRequest function")
			return
		}
		tunnel.on("request", fn)
	}

	/**
	 * Event handler when tunnel gets closed
	 *
	 * @static
	 * @param {() => any} fn event handler
	 * @memberof Tunnel
	 */
	public static onClose(fn: () => any) {
		if(tunnel===null){
			Console.error("Tunnel was not ready for onClose function")
			return
		}
		tunnel.on("close", fn)
	}

	/**
	 * Event handler when an error occurs on tunnel
	 *
	 * @static
	 * @param {(error: string) => any} fn event handler
	 * @memberof Tunnel
	 */
	public static onError(fn: (error: string) => any) {
		if(tunnel===null){
			Console.error("Tunnel was not ready for onError function")
			return
		}
		tunnel.on("err", fn)
	}
}