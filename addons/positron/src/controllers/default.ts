import * as API from "@tsed/common"
import { ISuccess } from "@plugins/gymkonnect/interfaces/IResponse"
import { version } from "@positron/../package.local.json"
import { ROOT } from "@positron/paths"
import uuid from "uuid"

@API.Controller("/")
export default class DefaultController{

	@API.Get("/")
	@API.Post("/")
	public async defaultRoute(): Promise<{ message: string, version: string, cwd: string, pid: number } & ISuccess>{
		return {
			type: "success",
			message: "Positron is stable",
			version,
			cwd: ROOT,
			pid: process.pid
		}
	}

	@API.Get("/test")
	public async test(@API.Session() session: Express.Session){
		if(!session.id){
			session.id = uuid()
			session.counter = 0
		}
		session.counter ++
		return {
			session
		}
	}
}
