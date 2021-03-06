import { Logger } from "@classes/CONSOLE"
import * as util from "@@/config/util"

import AppConfig from "@classes/appConfig"
import GQLClient from "@plugins/core/utils/graphql"
import PositronClient from "@plugins/core/utils/positron"
import Analytics from "@classes/analytics"

export class MainProcess {
	private static log = new Logger("electron/ui")

	private static async Initialize() {
		MainProcess.log.verbose("initialize")
		await AppConfig.Initialize()
		await Promise.all([
			PositronClient.Initialize(),
			GQLClient.Initialize(),
			Analytics.Initialize(),
		])
	}

	public static async main() {
		MainProcess.log.verbose("main()")
		try {
			await MainProcess.Initialize()
		}
		catch (error) {
			MainProcess.log.error(error)
			MainProcess.log.warn("will render UI with errors")
		}
		if (util.isNotInstalled()) {
			MainProcess.log.info("rendering installer")
			require("@/app.installer")
		}
		else {
			MainProcess.log.info("rendering main app")
			require("@/app.main")
		}
	}
}
