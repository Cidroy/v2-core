import { Positron } from "@positron/POSITRON"
import { Logger } from "@classes/CONSOLE"

export class MainProcess {
	private static positron: Positron
	private static args
	private static log = new Logger("main-process")

	public static async main(args) {
		this.log.info("main()")
		MainProcess.args = args
		MainProcess.positron = new Positron(args)
		MainProcess.positron.main()
		this.log.okay("main()")
	}

	public static async destroy() {
		this.log.info("destroy")
		await MainProcess.positron.destroy()
		this.log.okay("destroy")
	}
	
	public static async restart() {
		this.log.info("restart")
		await MainProcess.destroy()
		await MainProcess.main(MainProcess.args)
		this.log.okay("restart")
	}
	
	public static async shutdown() {
		this.log.info("shutdown")
		try { MainProcess.destroy() } catch (error) { MainProcess.log.error(error) }
		process.exit()
	}
}
