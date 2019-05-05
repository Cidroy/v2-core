import * as API from "@tsed/common"
import { Logger } from "@classes/CONSOLE"
import { ISuccess, IError } from "@plugins/core/interfaces/IResponse"
import BiometricDevices from "@neutron/lib/biometric"

@API.Controller("/test")
export class TestController{
	private log = new Logger("api/test")

	@API.Authenticated({ "neutron/core": "test" })
	@API.Post("/")
	public async test(): Promise<ISuccess & { depts: any } | IError>{
		try {
			this.log.verbose("testing")
			await BiometricDevices.Initialize()
			let device = await BiometricDevices.Device(BiometricDevices.DefaultDeviceID)
			await device.Initialize()
			await device.Login("admin", "admin")
			let depts = await device.GetDepartments()
			return { type: "success", depts }
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}

}
