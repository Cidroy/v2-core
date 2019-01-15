import * as API from "@tsed/common"
import { SupportedBiometricDevice, BiometricDeviceOptions } from "@neutron/supported-biometric-devices"
import { ISuccess, IError } from "@classes/interface/IResponse"
import BiometricDevices from "@neutron/lib/biometric"
import { Logger } from "@classes/CONSOLE"

@API.Controller("/devices")
export class BiometricDeviceController{
	private log = new Logger("api/biometric-device")

	@API.Authenticated({ "neutron/biometric-device": "device|add" })
	@API.Post("/add")
	public async add(
		@API.BodyParams("id") id: string| null| undefined,
		@API.BodyParams("type") type: SupportedBiometricDevice,
		@API.BodyParams("options") options: BiometricDeviceOptions,
	): Promise<({ device: string } & ISuccess) | IError>{
		try {
			if(id===undefined) id = null
			this.log.verbose({ type, options, })
			await BiometricDevices.Initialize()
			let device = await BiometricDevices.AddBiometricDevice(id, type, options)
			return {
				type: "success",
				device,
			}
		} catch (error) {
			return {
				type: "error",
				message: error.toString(),
				trace: error,
			}
		}
	}

	@API.Authenticated({ "neutron/biometric-device": "device|edit" })
	@API.Post("/edit")
	public async edit(
		@API.BodyParams("id") id: string,
		@API.BodyParams("options") newOptions: BiometricDeviceOptions,
	): Promise<ISuccess | IError>{
		try {
			await BiometricDevices.Initialize()
			await BiometricDevices.EditBiometricDevice(id, newOptions)
			return { type: "success", }
		} catch (error) {
			return {
				type: "error",
				message: error.toString(),
				trace: error,
			}
		}
	}

	@API.Authenticated({ "neutron/biometric-device": "device|delete" })
	@API.Post("/delete")
	public async delete(
		@API.BodyParams("id") id: string,
	): Promise<ISuccess | IError>{
		try {
			await BiometricDevices.Initialize()
			await BiometricDevices.DeleteBiometricDevice(id)
			return { type: "success", }
		} catch (error) {
			return {
				type: "error",
				message: error.toString(),
				trace: error,
			}
		}
	}

	@API.Authenticated({ "neutron/biometric-device": "device|set-default" })
	@API.Post("/set-default")
	public async setDefault(
		@API.BodyParams("id") id: string,
	): Promise<ISuccess | IError>{
		try {
			await BiometricDevices.Initialize()
			await BiometricDevices.SetAsDefaultBiometricDevice(id)
			return { type: "success", }
		} catch (error) {
			return {
				type: "error",
				message: error.toString(),
				trace: error,
			}
		}
	}

	@API.Authenticated({ "neutron/biometric-device": "device|view" })
	@API.Post("/view")
	public async view(
		@API.BodyParams("id") id: string
	): Promise<({ device: any } & ISuccess) | IError> {
		try {
			await BiometricDevices.Initialize()
			let devices = await BiometricDevices.GetBiometricDevices()
			if(!devices.hasOwnProperty(id)) throw "Invalid device ID"
			return {
				type: "success",
				device: devices[id],
			}
		} catch (error) {
			return {
				type: "error",
				message: error.toString(),
				trace: error,
			}
		}
	}

	@API.Authenticated({ "neutron/biometric-device": "device|view-all" })
	@API.Post("/all")
	public async all(): Promise<( { devices: any } & ISuccess) | IError>{
		try {
			await BiometricDevices.Initialize()
			return {
				type: "success",
				devices: await BiometricDevices.GetBiometricDevices()
			}
		} catch (error) {
			return {
				type: "error",
				message: error.toString(),
				trace: error,
			}
		}
	}

	@API.Authenticated({ "neutron/biometric-device": "device|view-default" })
	@API.Post("/default")
	public async default(): Promise<( { device: any, id: string } & ISuccess) | IError>{
		try {
			await BiometricDevices.Initialize()
			let id = await BiometricDevices.GetDefaultBiometricDeviceID()
			if(id===null) throw "No default biometric device set."
			return {
				type: "success",
				id,
				device: (await BiometricDevices.GetBiometricDevices())[id]
			}
		} catch (error) {
			return {
				type: "error",
				message: error.toString(),
				trace: error,
			}
		}
	}

	@API.Authenticated({ "neutron/biometric-device": "supported|view-all" })
	@API.Get("/supported")
	public async supported(): Promise<({ devices: any } & ISuccess)| IError>{
		try {
			return {
				type: "success",
				devices: SupportedBiometricDevice
			}
		} catch (error) {
			return {
				type: "error",
				message: error.toString()
			}
		}
	}
}