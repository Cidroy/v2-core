import * as API from "@tsed/common"
import { ISuccess } from "@plugins/gymkonnect/interfaces/IResponse"
import { Positron } from "@positron/POSITRON"
import { INSTALL_STEP } from "@positron/lib/misc"
import { Logger } from "@classes/CONSOLE"
import { MainProcess } from "@positron/MainProcess"

@API.Controller("/install")
export default class InstallController{
	private log = new Logger("api/installation")

	@API.Authenticated({ "positron/core": "install|status" })
	@API.Post("/status")
	public async defaultRoute(): Promise<{ installed: boolean, step: INSTALL_STEP } & ISuccess>{
		this.log.verbose("get installation status")
		let { installed, step } = Positron.InstallationState()
		return {
			type: "success",
			installed,
			step,
		}
	}

	@API.Authenticated({ "positron/core": "restart" })
	@API.Post("/restart")
	public async restart(): Promise<ISuccess>{
		this.log.verbose("try restart")
		await MainProcess.restart()
		return { type: "success" }
	}

	@API.Authenticated({ "positron/core": "shutdown" })
	@API.Post("/shutdown")
	public async shutdown(): Promise<ISuccess>{
		this.log.verbose("try shutdown")
		setTimeout(async () => {
			await MainProcess.shutdown()
		}, 500)
		return { type: "success" }
	}
}