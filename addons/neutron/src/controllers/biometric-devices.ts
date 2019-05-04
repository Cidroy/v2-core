import * as API from "@tsed/common"
import { SupportedBiometricDevice, BiometricDeviceOptions } from "@neutron/supported-biometric-devices"
import { ISuccess, IError } from "@plugins/gymkonnect/interfaces/IResponse"
import BiometricDevices from "@neutron/lib/biometric"
import { Logger } from "@classes/CONSOLE"
import { TBiometricDetails, BIOMETRIC_DEVICE_MODE } from "@neutron/lib/IBiometric"

/**
 * Controller for Higher order device interaction
 *
 * @export
 * @class BiometricDevicesController
 */
@API.Controller("/biometric-devices")
export class BiometricDevicesController{
	private log = new Logger("api/biometric-devices")

	/**
	 * Add device
	 *
	 * @permission { "neutron/biometric-device": "device|add" }
	 * @param {(string| null| undefined)} id
	 * @param {SupportedBiometricDevice} type
	 * @param {BiometricDeviceOptions} options
	 * @returns {(Promise<({ device: string } & ISuccess) | IError>)}
	 * @memberof BiometricDevicesController
	 */
	@API.Authenticated({ "neutron/biometric-device": "device|add" })
	@API.Post("/add")
	public async add(
		@API.BodyParams("id") id?: string | null,
		@API.BodyParams("type") type?: SupportedBiometricDevice,
		@API.BodyParams("options") options?: BiometricDeviceOptions,
		@API.BodyParams("mode") mode?: BIOMETRIC_DEVICE_MODE,
		@API.BodyParams("credentials") credentials?: { username: string, password: string, },
		@API.BodyParams("saveOnly") saveOnly?: boolean,
	): Promise<({ device: string } & ISuccess) | IError>{
		try {
			this.log.verbose("add device", { id, type, options, saveOnly, mode, })
			if(!type) throw "Device Type is needed"
			if(!options) throw "Device Options is needed"
			if(id===undefined) id = null
			if(saveOnly===undefined) saveOnly = false
			if(mode===undefined) mode = BIOMETRIC_DEVICE_MODE.SLAVE
			if(!credentials) credentials = { username: "", password: "", }

			await BiometricDevices.Initialize()
			let device = await BiometricDevices.Add(id, type, options, mode, credentials, saveOnly)
			await BiometricDevices.SaveCredentials(device, credentials.username, credentials.password)
			return { type: "success", device, }
		} catch (error) {
			return {
				type: "error",
				message: error.toString(),
				trace: error,
			}
		}
	}

	/**
	 * Edit Device
	 *
	 * @permission { "neutron/biometric-device": "device|edit" }
	 * @param {string} id device id
	 * @param {BiometricDeviceOptions} newOptions new device options
	 * @returns {(Promise<ISuccess | IError>)}
	 * @memberof BiometricDevicesController
	 */
	@API.Authenticated({ "neutron/biometric-device": "device|edit" })
	@API.Post("/edit")
	public async edit(
		@API.BodyParams("id") id: string,
		@API.BodyParams("options") newOptions: BiometricDeviceOptions,
	): Promise<ISuccess | IError>{
		try {
			await BiometricDevices.Initialize()
			await BiometricDevices.Edit(id, newOptions)
			return { type: "success", }
		} catch (error) {
			return {
				type: "error",
				message: error.toString(),
				trace: error,
			}
		}
	}

	/**
	 * Delete Device
	 *
	 * @permission { "neutron/biometric-device": "device|delete" }
	 * @param {string} id device id
	 * @returns {(Promise<ISuccess | IError>)} response
	 * @memberof BiometricDevicesController
	 */
	@API.Authenticated({ "neutron/biometric-device": "device|delete" })
	@API.Post("/delete")
	public async delete(
		@API.BodyParams("id") id: string,
	): Promise<ISuccess | IError>{
		try {
			await BiometricDevices.Initialize()
			await BiometricDevices.Delete(id)
			return { type: "success", }
		} catch (error) {
			return {
				type: "error",
				message: error.toString(),
				trace: error,
			}
		}
	}

	/**
	 * Set Master device
	 *
	 * @permission { "neutron/biometric-device": "device|set-default" }
	 * @param {string} id device id
	 * @returns {(Promise<ISuccess | IError>)}response
	 * @memberof BiometricDevicesController
	 */
	@API.Authenticated({ "neutron/biometric-device": "device|set-default" })
	@API.Post("/set-default")
	public async setDefault(
		@API.BodyParams("id") id: string,
	): Promise<ISuccess | IError>{
		try {
			await BiometricDevices.Initialize()
			await BiometricDevices.SetAsDefault(id)
			return { type: "success", }
		} catch (error) {
			return {
				type: "error",
				message: error.toString(),
				trace: error,
			}
		}
	}

	/**
	 * view device details
	 *
	 * @permission { "neutron/biometric-device": "device|view" }
	 * @param {string} id device id
	 * @returns {(Promise<({ device: any } & ISuccess) | IError>)} response
	 * @memberof BiometricDevicesController
	 */
	@API.Authenticated({ "neutron/biometric-device": "device|view" })
	@API.Post("/view")
	public async view(
		@API.BodyParams("id") id: string
	): Promise<({ device: any } & ISuccess) | IError> {
		try {
			await BiometricDevices.Initialize()
			let devices = await BiometricDevices.Devices()
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

	/**
	 * Show All Devices
	 *
	 * @permission { "neutron/biometric-device": "device|view-all" }
	 * @returns {(Promise<( { devices: any } & ISuccess) | IError>)} response
	 * @memberof BiometricDevicesController
	 */
	@API.Authenticated({ "neutron/biometric-device": "device|view-all" })
	@API.Post("/all")
	public async all(): Promise<( { devices: any } & ISuccess) | IError>{
		try {
			await BiometricDevices.Initialize()
			return {
				type: "success",
				devices: await BiometricDevices.Devices()
			}
		} catch (error) {
			return {
				type: "error",
				message: error.toString(),
				trace: error,
			}
		}
	}

	/**
	 * Show default/master device
	 *
	 * @permission { "neutron/biometric-device": "device|view-default" }
	 * @returns {(Promise<( { device: any, id: string } & ISuccess) | IError>)} response
	 * @memberof BiometricDevicesController
	 */
	@API.Authenticated({ "neutron/biometric-device": "device|view-default" })
	@API.Post("/default")
	public async default(): Promise<( { device: any, id: string } & ISuccess) | IError>{
		try {
			await BiometricDevices.Initialize()
			let id = BiometricDevices.DefaultDeviceID
			return {
				type: "success",
				id,
				device: (await BiometricDevices.Devices())[id]
			}
		} catch (error) {
			return {
				type: "error",
				message: error.toString(),
				trace: error,
			}
		}
	}

	/**
	 * List Supported devices
	 *
	 * @permission { "neutron/biometric-device": "supported|view-all" }
	 * @returns {(Promise<({ devices: any } & ISuccess)| IError>)}
	 * @memberof BiometricDevicesController
	 */
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

	/**
	 * Scan devices
	 *
	 * @param {SupportedBiometricDevice} type device type
	 * @param {BiometricDeviceOptions} options options
	 * @param {{ username: string, password: string }} credentials login credentials
	 * @returns {(Promise<({ devices: { [I: string]: TBiometricDetails } } & ISuccess) | IError>)} repsonse
	 * @memberof BiometricDevicesController
	 */
	@API.Authenticated({ "neutron/biometric-device": "scan" })
	@API.Post("/scan")
	public async ScanDevice(
		@API.BodyParams("type") type: SupportedBiometricDevice,
		@API.BodyParams("options") options: BiometricDeviceOptions,
		@API.BodyParams("credentials") credentials: { username: string, password: string },
	): Promise<({ devices: { [I: string]: TBiometricDetails } } & ISuccess) | IError> {
		try {
			this.log.verbose("scaning device")
			await BiometricDevices.Initialize()
			let devices = await BiometricDevices.ScanForDevices(type, options, credentials)
			this.log.verbose(devices)
			return {
				type: "success",
				devices,
			}
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}

	/**
	 * Get Registered device status
	 *
	 * @permission { "neutron/biometric-device": "status|all" }
	 * @returns {(Promise<({ devices: { [I: string]: TBiometricDetails } } & ISuccess) | IError>)}
	 * @memberof BiometricDevicesController
	 */
	@API.Authenticated({ "neutron/biometric-device": "status|all" })
	@API.Post("/status/all")
	public async StatusAll(): Promise<({ devices: { [I: string]: TBiometricDetails } } & ISuccess) | IError> {
		try {
			this.log.verbose("all device status")
			await BiometricDevices.Initialize()
			let devices = await BiometricDevices.StatusAll()
			this.log.verbose(devices)
			return {
				type: "success",
				devices,
			}
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}

	/**
	 * Add Zone to all devices
	 *
	 * @permission { "neutron/biometric-device": "zone|add" }
	 * @param {string} zoneName zone name
	 * @returns {(Promise<( { zoneId: number, zoneName: string } & ISuccess)| IError>)} response
	 * @memberof BiometricDevicesController
	 */
	@API.Authenticated({ "neutron/biometric-device": "zone|add" })
	@API.Post("/add/zone")
	public async AddZone(
		@API.BodyParams("zoneName") zoneName: string,
		@API.BodyParams("id") id?: string,
		@API.BodyParams("type") type?: SupportedBiometricDevice,
		@API.BodyParams("options") options?: BiometricDeviceOptions,
		@API.BodyParams("credentials") credentials?: { username: string, password: string, } ,
	): Promise<( { zoneId: number, zoneName: string } & ISuccess)| IError> {
		try {
			this.log.verbose("adding zone ", zoneName)
			await BiometricDevices.Initialize()
			let zoneId: number
			if(id) zoneId = await BiometricDevices.AddZone(zoneName, id)
			else if (type && options && credentials) zoneId = await BiometricDevices.AddZone(zoneName, null, type, options, credentials)
			else zoneId = await BiometricDevices.AddZone(zoneName)
			return {
				type: "success",
				zoneId,
				zoneName,
			}
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}

	/**
	 * Delete zone
	 *
	 * @permission { "neutron/biometric-device": "zone|delete" }
	 * @param {string} zoneName zone name
	 * @returns {(Promise<ISuccess | IError>)} response
	 * @memberof BiometricDevicesController
	 */
	@API.Authenticated({ "neutron/biometric-device": "zone|delete" })
	@API.Post("/delete/zone")
	public async DeleteZone(
		@API.BodyParams("zoneName") zoneName: string,
	): Promise<ISuccess | IError> {
		try {
			this.log.verbose("deleting zone ", zoneName)
			await BiometricDevices.Initialize()
			await BiometricDevices.DeleteZone(zoneName)
			return { type: "success" }
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}

	/**
	 * List all zones
	 *
	 * @param {SupportedBiometricDevice} type device type
	 * @param {BiometricDeviceOptions} options device options
	 * @param {{ username: string, password: string }} credentials login credentials
	 * @returns {(Promise<({ zones: { [I: string]: string } } & ISuccess) | IError>)} response
	 * @memberof BiometricDevicesController
	 */
	@API.Authenticated({ "neutron/biometric-device": "device-zones|view" })
	@API.Post("/zones/device-list")
	public async listZonesFromDevice(
		@API.BodyParams("type") type: SupportedBiometricDevice,
		@API.BodyParams("options") options: BiometricDeviceOptions,
		@API.BodyParams("credentials") credentials: { username: string, password: string },
	): Promise<({ zones: { [I: string]: string } } & ISuccess) | IError> {
		try {
			this.log.verbose("list of zones")
			await BiometricDevices.Initialize()
			let zones = await BiometricDevices.listZonesFromDevice(type, options, credentials)
			this.log.verbose(zones)
			return {
				type: "success",
				zones,
			}
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}

	/**
	 * List all Zones
	 *
	 * @permission { "neutron/biometric-device": "zones|view" }
	 * @returns {(Promise<({ zones: { [I: string]: number } } & ISuccess) | IError>)} response
	 * @memberof BiometricDevicesController
	 */
	@API.Authenticated({ "neutron/biometric-device": "zones|view" })
	@API.Post("/zones/list")
	public async listZones(): Promise<({ zones: { [I: string]: number } } & ISuccess) | IError> {
		try {
			this.log.verbose("list of zones")
			await BiometricDevices.Initialize()
			let zones = await BiometricDevices.listZones()
			this.log.verbose(zones)
			return {
				type: "success",
				zones,
			}
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}
}
