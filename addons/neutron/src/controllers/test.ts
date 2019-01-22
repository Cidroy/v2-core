import * as API from "@tsed/common"
import { Logger } from "@classes/CONSOLE"
import { ISuccess, IError } from "@classes/interface/IResponse"

@API.Controller("/test")
export class TestController{
	private log = new Logger("api/test")

	@API.Authenticated({ "neutron/core": "test" })
	@API.Post("/")
	public async test(
		@API.BodyParams("id") id: string,
	): Promise<ISuccess | IError>{
		try {
			this.log.verbose("testing")
			return { type: "success" }
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}

}