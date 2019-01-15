import * as API from "@tsed/common"
import Controllers from "@positron/controllers"
import { APIAuthentication } from "@positron/lib/api-authentication"

import config from "../config"

@API.ServerSettings({
	rootDir: __dirname,
	acceptMimes: [ "application/json", ],
	mount: Controllers,
	port: config.config.port
})
export class Server extends API.ServerLoader{
	public addControllersList(list: { [K: string]: any }){
		for (const endpoint in list) {
			if (list.hasOwnProperty(endpoint)) {
				const controllers = list[endpoint]
				this.addControllers(endpoint, controllers)
			}
		}
	}

	public get controllersList(){ return Controllers }
}