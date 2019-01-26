import * as API from "@tsed/common"
import { ISuccess } from "@classes/interface/IResponse"
import { version } from "@positron/../package.local.json"
import { ROOT } from "@positron/paths"

@API.Controller("/")
export default class DefaultController{

	@API.Get("/")
	@API.Post("/")
	public async defaultRoute(): Promise<{ message: string, version: string, cwd: string } & ISuccess>{
		return {
			type: "success",
			message: "Positron is stable",
			version,
			cwd: ROOT,
		}
	}
}