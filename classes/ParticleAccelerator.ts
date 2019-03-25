import child_process from "child_process"
import os from "os"
import path from "path"
import { Logger } from "@classes/CONSOLE"
import { sleep } from "@classes/misc"
import AppConfig from "@classes/appConfig"
import { existsSync, openSync } from "fs"

const defaults = {
	__dirname,
	cooldownTime: 20000
}

let config: typeof defaults = defaults

let initialized: boolean = false

export default class ParticleAccelerator{
	private static get basePath() { return config.__dirname }
	private static get cooldownTime(){ return config.cooldownTime }
	private static log = new Logger("particle-accelerator")

	public static async CreatePositron(log){
		let Console = new Logger("particle-accelerator/positron")
		let positron!: child_process.ChildProcess
		try {
			const out = openSync(path.resolve(os.tmpdir(), "gymkonnect-positron-stream.log"), "a")
			const err = openSync(path.resolve(os.tmpdir(), "gymkonnect-positron-stream.log"), "a")
			await ParticleAccelerator.Initialize()
			let positronPath = path.resolve(ParticleAccelerator.basePath, `resources/positron${os.platform() === "win32" ? ".exe" : ""}`)
			Console.verbose("try spawning positron @", positronPath)
			if(!existsSync(positronPath)) throw "Positron not found"
			positron = child_process.spawn(positronPath, ["--verbose",], {
				detached: true,
				stdio: ["ignore", out, err,]
			})
			log(`spinning particle accelerator #${positron.pid} for positron`)
			Console.info("positron pid :", positron.pid)
			let particleLogger = new Logger(`positron#${positron.pid}@particle-accelerator`)
			let positronReady = false
			let attempts = ParticleAccelerator.cooldownTime / 1000
			// FIXME: [Vicky] log and detect server ready
			// positron.stdout.on("data", (data:string) => {
			// 	if (data.includes("SERVER READY")) positronReady = true
			// 	particleLogger.log(data.toString())
			// })
			// positron.stderr.on("data", data => {
			// 	particleLogger.error(data.toString())
			// 	throw data.toString()
			// })

			// positron.on("message", (message) => { Console.info("ipc", message) })
			Console.verbose(`sleeping for ${ParticleAccelerator.cooldownTime}`)
			log(`cooling down particle accelerator #${positron.pid}`)
			for (let i = 0; i < attempts; i++) {
				if(!positronReady) await sleep(1000)
			}
			Console.verbose("sleep complete")
		} catch (error) {
			Console.error(error)
		}
		positron.unref()

		return positron
	}

	public static async Initialize(){
		if(initialized) return
		try {
			ParticleAccelerator.log.verbose("try initialize ")
			let [dirname, _cooldownTime,] = await Promise.all([
				AppConfig.Get("__dirname", ""),
				AppConfig.Get("cooldownTime", defaults.cooldownTime),
			])
			config["__dirname"] = dirname
			config["cooldownTime"] = _cooldownTime

			ParticleAccelerator.log.verbose("config", config)
			await Promise.all([
				AppConfig.Set("__dirname", config.__dirname),
				AppConfig.Set("cooldownTime", config.cooldownTime),
			])
		} catch (error) {
			ParticleAccelerator.log.error(error)
			return
		}
		initialized = true
	}
}