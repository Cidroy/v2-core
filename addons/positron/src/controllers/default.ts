import * as API from "@tsed/common"
import { ISuccess } from "@classes/interface/IResponse"

@API.Controller("/")
export default class DefaultController{

	@API.Get("/")
	@API.Post("/")
	public async defaultRoute(): Promise<{ message: string } & ISuccess>{
		return {
			type: "success",
			message: "Positron is stable"
		}
	}
}