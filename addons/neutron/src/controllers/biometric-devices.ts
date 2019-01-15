import * as API from "@tsed/common"
import { SupportedBiometricDevice, BiometricDeviceOptions } from "@neutron/supported-biometric-devices"
import { ISuccess, IError } from "@classes/interface/IResponse"
import BiometricDevices from "@neutron/lib/biometric"

@API.Controller("/devices")
export class BiometricDeviceController{

	@API.Authenticated({ "neutron/biometric-device": "device|add" })
	@API.Post("/add")
	public async add(
		@API.QueryParams("type") type: SupportedBiometricDevice,
		@API.QueryParams("options") options: BiometricDeviceOptions,
	): Promise<({ device: string } & ISuccess) | IError>{
		try {
			let device = await BiometricDevices.AddBiometricDevice(type, options)
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
		@API.QueryParams("type") id: string,
		@API.QueryParams("options") newOptions: BiometricDeviceOptions,
	): Promise<ISuccess | IError>{
		try {
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
		@API.QueryParams("type") id: string,
	): Promise<ISuccess | IError>{
		try {
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
		@API.QueryParams("type") id: string,
	): Promise<ISuccess | IError>{
		try {
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

	@API.Authenticated({ "neutron/biometric-device": "device|view-all" })
	@API.Post("/view-all")
	public async viewAll(): Promise<( { devices: any } & ISuccess) | IError>{
		try {
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