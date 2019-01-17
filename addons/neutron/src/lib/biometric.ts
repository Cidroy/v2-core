import { Logger } from "@classes/CONSOLE"
import { SupportedBiometricDevice, BiometricDeviceOptions, InstanceList, TBiometricDevices, TBiometricDevice } from "@neutron/supported-biometric-devices"
import AppConfig from "@classes/appConfig"
import uuid from "uuid/v4"

export default class BiometricDevices {
	protected static Namespace = "neutron/biometric-devices"

	protected static log: Logger = new Logger("biometric-device")

	private static config: {
		defaultBiometricDevice: string | null,
		biometricDevices: { [I: string]: BiometricDeviceOptions & { DeviceType: SupportedBiometricDevice } },
		credentials: { [I: string]: { username: string, password: string, } },
		zones: { [I: string]: number },
	}
		= {
			defaultBiometricDevice: null,
			biometricDevices: {},
			credentials: {},
			zones: {},
		}

	private static cache = {
		biometricDevices: new Map<string, TBiometricDevice>(),
	}

	public static async Initialize() {
		BiometricDevices.config = await AppConfig.Get(BiometricDevices.Namespace, BiometricDevices.config)
	}

	private static async SaveConfig() {
		try {
			await AppConfig.Set(BiometricDevices.Namespace, BiometricDevices.config)
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "unable to save neutron config"
		}
	}

	public static async Add(id: string | null, type: SupportedBiometricDevice, options: BiometricDeviceOptions): Promise<string> {
		try {
			BiometricDevices.log.verbose({ InstanceList, type })
			let test = new InstanceList[type](options)
			await test.Initialize()
			BiometricDevices.log.info(`${type} successfully connected`)
			if (!id) id = uuid()
			BiometricDevices.config.biometricDevices[<string>id] = { ...options, DeviceType: type, id }
			await BiometricDevices.SaveConfig()
			return <string>id
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "Unable to add new biometric device. Check your config options and try again."
		}
	}

	public static async Edit(id: string, newOptions: BiometricDeviceOptions): Promise<boolean> {
		try {
			BiometricDevices.log.verbose({ id, newOptions, })
			if (!BiometricDevices.config.biometricDevices.hasOwnProperty(id)) throw "Invalid biometric device ID"
			let options = BiometricDevices.config.biometricDevices[id]
			let test = new InstanceList[options.DeviceType](newOptions)
			await test.Initialize()
			BiometricDevices.config.biometricDevices[id] = { ...options, DeviceType: options.DeviceType }
			BiometricDevices.log.info("biometric device settings updated successfully")
			await BiometricDevices.SaveConfig()
			return true
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "Unable to change biometric settings."
		}
	}

	public static async Delete(id: string): Promise<boolean> {
		try {
			if (!BiometricDevices.config.biometricDevices.hasOwnProperty(id)) throw "Invalid biometric device ID"
			delete BiometricDevices.config.biometricDevices[id]
			if (BiometricDevices.config.defaultBiometricDevice === id) BiometricDevices.config.defaultBiometricDevice = null
			if (BiometricDevices.config.credentials.hasOwnProperty(id)) delete BiometricDevices.config.credentials[id]
			await BiometricDevices.SaveConfig()
			return true
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "Unable to delete biometric settings."
		}
	}

	public static async SetAsDefault(id: string): Promise<boolean> {
		try {
			BiometricDevices.log.verbose({ id, biometricDevices: BiometricDevices.config.biometricDevices, })
			if (!BiometricDevices.config.biometricDevices.hasOwnProperty(id)) throw "Invalid biometric device ID"
			BiometricDevices.config.defaultBiometricDevice = id
			await BiometricDevices.SaveConfig()
			return true
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "Unable to set default biometric device."
		}
	}

	public static async Devices() { return BiometricDevices.config.biometricDevices }

	public static get DefaultDeviceID(): string {
		if (BiometricDevices.config.defaultBiometricDevice === null) throw "No default biometric device set."
		return BiometricDevices.config.defaultBiometricDevice
	}

	public static async Device(id: string) {
		try {
			if (!BiometricDevices.config.biometricDevices.hasOwnProperty(id)) throw "Invalid biometric device ID"
			if (BiometricDevices.cache.biometricDevices.has(id)) return <TBiometricDevice>BiometricDevices.cache.biometricDevices.get(id)
			let options = BiometricDevices.config.biometricDevices[id]
			let device = new InstanceList[options.DeviceType](options)
			await device.Initialize()
			BiometricDevices.cache.biometricDevices.set(id, device)
			return device
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "Unable to get device."
		}
	}

	public static async SaveCredentials(id: string, username: string, password: string): Promise<boolean> {
		try {
			let device = await BiometricDevices.Device(id)
			let success = await device.Login(username, password)
			if (!success) throw "Unable to login to device."
			BiometricDevices.config.credentials[id] = { username, password, }
			await BiometricDevices.SaveConfig()
			return true
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "Unable to login to device."
		}
	}

	public static GetCredentials(id: string): { username: string, password: string } {
		if (!BiometricDevices.config.biometricDevices.hasOwnProperty(id)) throw "Invalid biometric device ID"
		if (!BiometricDevices.config.credentials.hasOwnProperty(id)) throw "This Biometric does not have any credentials."
		return BiometricDevices.config.credentials[id]
	}

	/**
	 * Auto Login to device
	 * @private
	 * @static
	 * @param {TBiometricDevice} device
	 * @memberof BiometricDevices
	 */
	private static async _Login(device: TBiometricDevice) {
		let { username, password } = BiometricDevices.GetCredentials(device.ID)
		await device.Login(username, password)
	}

	public static get Zones() { return BiometricDevices.config.zones }

	/**
	 * Add Zone using master device
	 * @static
	 * @param {string} zoneName Zone Name
	 * @returns {Promise<number>} Zone ID
	 * @memberof BiometricDevices
	 */
	public static async AddZone(zoneName: string): Promise<number> {
		if (BiometricDevices.Zones.hasOwnProperty(zoneName)) throw "Zone name already exists"
		let device = await BiometricDevices.Device(BiometricDevices.DefaultDeviceID)
		await BiometricDevices._Login(device)
		let zoneID = await device.AddZone(zoneName)
		BiometricDevices.config.zones[zoneName] = zoneID
		await BiometricDevices.SaveConfig()
		return zoneID
	}

	/**
	 * Edit zone using master device
	 * **TODO:** add generalized zone editing format
	 * @static
	 * @param {string} zoneName Zone name
	 * @param {*} options options
	 * @returns {Promise<boolean>} true if success
	 * @memberof BiometricDevices
	 */
	public static async EditZone(zoneName: string, options: any): Promise<boolean> {
		throw "Zone Editing is not allowed"
	}

	/**
	 * Delete Zone using master device
	 * @static
	 * @param {string} zoneName Zone name
	 * @returns {Promise<boolean>} true if success
	 * @memberof BiometricDevices
	 */
	public static async DeleteZone(zoneName: string): Promise<boolean> {
		if (!BiometricDevices.Zones.hasOwnProperty(zoneName)) throw "Zone name does not exists"
		let device = await BiometricDevices.Device(BiometricDevices.DefaultDeviceID)
		await BiometricDevices._Login(device)
		await device.DeleteZone(zoneName)
		delete BiometricDevices.config.zones[zoneName]
		await BiometricDevices.SaveConfig()
		return true
	}

	/**
	 * Set the Zone for a specific device
	 * @static
	 * @param {string} id device id
	 * @param {string} zoneName zone Name
	 * @returns {Promise<boolean>} true if success
	 * @memberof BiometricDevices
	 */
	public static async SetZone(id: string, zoneName: string): Promise<boolean> {
		if (!BiometricDevices.Zones.hasOwnProperty(zoneName)) throw "Zone name does not exists"
		if (!BiometricDevices.config.biometricDevices.hasOwnProperty(id)) throw "Invalid biometric device ID"
		let device = await BiometricDevices.Device(id)
		await BiometricDevices._Login(device)
		await device.SetZone(zoneName)
		return true
	}

	/**
	 * Give Zone Access to Member
	 *
	 * @static
	 * @param {(string| null)} id OPTIONAL.
	 *
	 * device id.
	 *
	 * defaults to master
	 * @param {string} memberId Member ID
	 * @param {string} zoneName Zone Name
	 * @returns {Promise<boolean>} true if success
	 * @memberof BiometricDevices
	 */
	public static async AddMemberZone(id: string | null, memberId: string, zoneName: string): Promise<boolean> {
		if (!BiometricDevices.Zones.hasOwnProperty(zoneName)) throw "Zone name does not exists"
		if (id === null) id = BiometricDevices.DefaultDeviceID
		else
			if (!BiometricDevices.config.biometricDevices.hasOwnProperty(id)) throw "Invalid biometric device ID"
		let device = await BiometricDevices.Device(id)
		await BiometricDevices._Login(device)
		return await device.AddMemberZone(memberId, zoneName)
	}

	/**
	 * Move Member to another Zone
	 *
	 * @static
	 * @param {(string| null)} id OPTIONAL.
	 *
	 * device id.
	 *
	 * defaults to master
	 * @param {string} memberId Member ID
	 * @param {string} zoneName Zone Name
	 * @returns {Promise<boolean>} true if success
	 * @memberof BiometricDevices
	 */
	public static async MoveMemberZone(id: string | null, memberId: string, zoneName: string): Promise<boolean> {
		if (!BiometricDevices.Zones.hasOwnProperty(zoneName)) throw "Zone name does not exists"
		if (id === null) id = BiometricDevices.DefaultDeviceID
		else
			if (!BiometricDevices.config.biometricDevices.hasOwnProperty(id)) throw "Invalid biometric device ID"
		let device = await BiometricDevices.Device(id)
		await BiometricDevices._Login(device)
		return await device.MoveMemberZone(memberId, zoneName)
	}

	/**
	 * Move Member to another Zone
	 *
	 * @static
	 * @param {(string| null)} id OPTIONAL.
	 *
	 * device id.
	 *
	 * defaults to master
	 * @param {string} memberId Member ID
	 * @param {string} zoneName Zone Name
	 * @returns {Promise<boolean>} true if success
	 * @memberof BiometricDevices
	 */
	public static async RemoveMemberZone(id: string | null, memberId: string, zoneName: string): Promise<boolean> {
		this.log.verbose("remove member zone")
		if (!BiometricDevices.Zones.hasOwnProperty(zoneName)) throw "Zone name does not exists"
		if (id === null) id = BiometricDevices.DefaultDeviceID
		else
			if (!BiometricDevices.config.biometricDevices.hasOwnProperty(id)) throw "Invalid biometric device ID"
		let device = await BiometricDevices.Device(id)
		await BiometricDevices._Login(device)
		return await device.RemoveMemberZone(memberId, zoneName)
	}

}