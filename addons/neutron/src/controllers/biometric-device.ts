import * as API from "@tsed/common"
import BiometricDevices from "@neutron/lib/biometric"
import { Logger } from "@classes/CONSOLE"
import { ISuccess, IError } from "@classes/interface/IResponse"
import { TBiometricDevice } from "@neutron/supported-biometric-devices"

@API.Controller("/biometric-device")
export class BiometricDeviceController{
	private log = new Logger("api/biometric-devices")

	@API.Authenticated({ "neutron/biometric-device": "credentials|add" })
	@API.Post("/credentials/add")
	public async addCredentials(
		@API.BodyParams("id") id: string,
		@API.BodyParams("username") username: string,
		@API.BodyParams("password") password: string,
	): Promise<ISuccess | IError>{
		try {
			if(!id) throw "ID is required."
			if(!username) throw "Username is required."
			if(!password) throw "Password is required."
			await BiometricDevices.Initialize()
			let success = await BiometricDevices.SaveCredentials(id, username, password)
			if(!success) throw "Unable to save biometric device credential"
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