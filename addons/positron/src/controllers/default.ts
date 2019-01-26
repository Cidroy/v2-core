import * as API from "@tsed/common"
import { ISuccess } from "@classes/interface/IResponse"
import { version } from "~positron/package.json"

@API.Controller("/")
export default class DefaultController{

	@API.Get("/")
	@API.Post("/")
	public async defaultRoute(): Promise<{ message: string, version: string } & ISuccess>{
		return {
			type: "success",
			message: "Positron is stable",
			version,
		}
	}
}