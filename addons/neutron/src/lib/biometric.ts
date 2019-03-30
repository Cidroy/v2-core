import { Logger } from "@classes/CONSOLE"
import { SupportedBiometricDevice, BiometricDeviceOptions, InstanceList, TBiometricDevices, TBiometricDevice } from "@neutron/supported-biometric-devices"
import AppConfig from "@classes/appConfig"
import uuid from "uuid/v4"
import { TBiometricMemberDetails, TBiometricDetails, BIOMETRIC_DEVICE_MODE } from "@neutron/lib/IBiometric"

export default class BiometricDevices {
	/**
	 * Logging namespace
	 *
	 * @protected
	 * @static
	 * @memberof BiometricDevices
	 */
	protected static Namespace = "neutron/biometric-devices"

	protected static log: Logger = new Logger("biometric-device")

	/**
	 * default config for all devices
	 *
	 * @private
	 * @static
	 * @type {({
	 * 		defaultBiometricDevice: string | null,
	 * 		biometricDevices: { [I: string]: BiometricDeviceOptions & { DeviceType: SupportedBiometricDevice } },
	 * 		credentials: { [I: string]: { username: string, password: string, } },
	 * 		zones: { [I: string]: number },
	 * 	})}
	 * @memberof BiometricDevices
	 */
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

	/**
	 * device cache
	 *
	 * @private
	 * @static
	 * @memberof BiometricDevices
	 */
	private static cache = {
		biometricDevices: new Map<string, TBiometricDevice>(), // name, device
	}

	/**
	 * Initialize device configs
	 *
	 * @static
	 * @memberof BiometricDevices
	 */
	public static async Initialize() {
		let config = await AppConfig.Get(BiometricDevices.Namespace, BiometricDevices.config)
		BiometricDevices.config = { ...BiometricDevices.config, ...config }
		BiometricDevices.log.verbose("initialized", BiometricDevices.config)
	}

	/**
	 * Save config
	 *
	 * @private
	 * @static
	 * @memberof BiometricDevices
	 */
	private static async SaveConfig() {
		try {
			await AppConfig.Set(BiometricDevices.Namespace, BiometricDevices.config)
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "unable to save neutron config"
		}
	}

	/**
	 * Add Device
	 *
	 * @static
	 * @param {(string | null)} id device id
	 * @param {SupportedBiometricDevice} type device type
	 * @param {BiometricDeviceOptions} options device options
	 * @param {BIOMETRIC_DEVICE_MODE} mode device operation mode
	 * @param {boolean} saveOnly save only
	 * To make only neutron save the device and not pass it on
	 * @returns {Promise<string>} device id
	 * @memberof BiometricDevices
	 */
	public static async Add(id: string | null, type: SupportedBiometricDevice, options: BiometricDeviceOptions, mode: BIOMETRIC_DEVICE_MODE, credentials: {username: string, password: string} , saveOnly: boolean = false): Promise<string> {
		try {
			BiometricDevices.log.verbose("Add Device", { InstanceList, type })
			let test = new InstanceList[type](options)
			await test.Initialize()
			BiometricDevices.log.info(`${type} successfully connected`)
			if (!id) id = uuid()
			BiometricDevices.config.biometricDevices[id] = { ...options, DeviceType: type, id }
			if(!saveOnly){
				await test.Login(credentials.username, credentials.password)
				await test.AddDevice(mode)
				let options = await test.DeviceDetails
				BiometricDevices.config.biometricDevices[id] = options
			}
			if(mode === BIOMETRIC_DEVICE_MODE.MASTER) await BiometricDevices.SetAsDefault(id)
			await BiometricDevices.SaveConfig()
			return <string>id
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "Unable to add new biometric device. Check your config options and try again."
		}
	}

	/**
	 * Edit Device
	 *
	 * @static
	 * @param {string} id device id
	 * @param {BiometricDeviceOptions} newOptions device options
	 * @returns {Promise<boolean>} response
	 * @memberof BiometricDevices
	 */
	public static async Edit(id: string, newOptions: BiometricDeviceOptions): Promise<boolean> {
		try {
			BiometricDevices.log.verbose("try edit device ",{ id, newOptions, })
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

	/**
	 * Delete Device
	 *
	 * @static
	 * @param {string} id device id
	 * @returns {Promise<boolean>} response
	 * @memberof BiometricDevices
	 */
	public static async Delete(id: string): Promise<boolean> {
		try {
			BiometricDevices.log.verbose("try delete device ", id)
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

	/**
	 * Set device as default / master
	 *
	 * @static
	 * @param {string} id device id
	 * @returns {Promise<boolean>} response
	 * @memberof BiometricDevices
	 */
	public static async SetAsDefault(id: string): Promise<boolean> {
		try {
			BiometricDevices.log.verbose("try set default device ", { id, biometricDevices: BiometricDevices.config.biometricDevices, })
			if (!BiometricDevices.config.biometricDevices.hasOwnProperty(id)) throw "Invalid biometric device ID"
			BiometricDevices.config.defaultBiometricDevice = id
			await BiometricDevices.SaveConfig()
			return true
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "Unable to set default biometric device."
		}
	}

	/**
	 * Devices list
	 *
	 * @static
	 * @returns response
	 * @memberof BiometricDevices
	 */
	public static async Devices() { return BiometricDevices.config.biometricDevices }

	/**
	 * Default/Master Device ID
	 *
	 * @readonly
	 * @static
	 * @type {string}
	 * @memberof BiometricDevices
	 */
	public static get DefaultDeviceID(): string {
		if (BiometricDevices.config.defaultBiometricDevice === null) throw "No default biometric device set."
		return BiometricDevices.config.defaultBiometricDevice
	}

	/**
	 * Get Device
	 *
	 * @static
	 * @param {string} id device id
	 * @returns
	 * @memberof BiometricDevices
	 */
	public static async Device(id: string) {
		try {
			BiometricDevices.log.verbose(`select device by id = ${id}`)
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

	/**
	 * Save Credentials
	 *
	 * @static
	 * @param {string} id device id
	 * @param {string} username username
	 * @param {string} password password
	 * @returns {Promise<boolean>} response
	 * @memberof BiometricDevices
	 */
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

	/**
	 * Get credentials for device
	 *
	 * @static
	 * @param {string} id device id
	 * @returns {{ username: string, password: string }} credentials
	 * @memberof BiometricDevices
	 */
	public static GetCredentials(id: string): { username: string, password: string } {
		BiometricDevices.log.verbose("try get credentials for device ", id)
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

	/**
	 * List all Zones
	 * MAP<zoneName, zoneiD>
	 * @readonly
	 * @static
	 * @memberof BiometricDevices
	 */
	public static get Zones() { return BiometricDevices.config.zones }

	/**
	 * Get Zone ID for Zone name
	 *
	 * @static
	 * @param {string} zoneName
	 * @returns
	 * @memberof BiometricDevices
	 */
	public static ZoneID(zoneName: string){
		if (!BiometricDevices.config.zones.hasOwnProperty(zoneName))
			throw "Invalid Zone Name"
		return BiometricDevices.config.zones[zoneName]
	}

	/**
	 * Add Zone using master device
	 * @static
	 * @param {string} zoneName Zone Name
	 * @returns {Promise<number>} Zone ID
	 * @memberof BiometricDevices
	 */
	public static async AddZone(zoneName: string): Promise<number>
	public static async AddZone(zoneName: string, id: string): Promise<number>
	public static async AddZone(zoneName: string, id: null, type: SupportedBiometricDevice, options: BiometricDeviceOptions, credentials: { username: string, password: string }): Promise<number>
	public static async AddZone(zoneName: string, id?: string| null, type?: SupportedBiometricDevice, options?: BiometricDeviceOptions, credentials?: { username: string, password: string } ): Promise<number> {
		if (BiometricDevices.Zones.hasOwnProperty(zoneName)) throw "Zone name already exists"
		let device: TBiometricDevice
		if (type){
			if(!options) throw "Connection Options is needed"
			if(!credentials) throw "credentials is needed"
			device = new InstanceList[type](options)
			await device.Login(credentials.username, credentials.password)
		}
		else {
			id = id? id: BiometricDevices.DefaultDeviceID
			device = await BiometricDevices.Device(id)
			await BiometricDevices._Login(device)
		}
		await device.Initialize()
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
		BiometricDevices.log.verbose(`try set zone of device ${id} to zone ${zoneName}`)
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
	public static async AddMemberZone(deviceId: string | null, memberId: string, zoneName: string): Promise<boolean> {
		BiometricDevices.log.verbose(`try add member zone`, { deviceId, memberId, zoneName })
		if (!BiometricDevices.Zones.hasOwnProperty(zoneName)) throw "Zone name does not exists"
		if (deviceId === null) deviceId = BiometricDevices.DefaultDeviceID
		else
			if (!BiometricDevices.config.biometricDevices.hasOwnProperty(deviceId)) throw "Invalid biometric device ID"
		let device = await BiometricDevices.Device(deviceId)
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
		BiometricDevices.log.verbose(`try move member zone`, { id, memberId, zoneName })
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
		BiometricDevices.log.verbose(`try remove member zone`, { id, memberId, zoneName })
		if (!BiometricDevices.Zones.hasOwnProperty(zoneName)) throw "Zone name does not exists"
		if (id === null) id = BiometricDevices.DefaultDeviceID
		else
			if (!BiometricDevices.config.biometricDevices.hasOwnProperty(id)) throw "Invalid biometric device ID"
		let device = await BiometricDevices.Device(id)
		await BiometricDevices._Login(device)
		return await device.RemoveMemberZone(memberId, zoneName)
	}

	/**
	 * Add member to device
	 *
	 * @static
	 * @param {(string| null)} deviceId OPTIONAL.
	 *
	 * device id
	 *
	 * defaults to default device
	 * @param {string} badgeNumber badge number
	 * @param {TBiometricMemberDetails} details member details
	 * @returns {Promise<boolean>} true if success
	 * @memberof BiometricDevices
	 */
	public static async Addmember(deviceId: string| null, badgeNumber: string, details: TBiometricMemberDetails): Promise<boolean>{
		BiometricDevices.log.verbose("try add member", { deviceId, badgeNumber, details })
		if (deviceId === null) deviceId = BiometricDevices.DefaultDeviceID
		else
			if (!BiometricDevices.config.biometricDevices.hasOwnProperty(deviceId)) throw "Invalid biometric device ID"

		let device = await BiometricDevices.Device(deviceId)
		await BiometricDevices._Login(device)
		await device.AddMember(badgeNumber, details)
		return true
	}
	/**
	 *delete member
	*
	* @static
	* @param {(string| null)} deviceId OPTIONAL
	* device ID
	* defaults to default device
	* @param {string} memberId Member Id
	* @returns {Promise<boolean>} true if success
	* @memberof BiometricDevices
	*/
public static async DeleteMember(deviceId: string| null, memberId: string): Promise<boolean>{
		BiometricDevices.log.verbose("try delete member", { memberId })
		if (deviceId === null) deviceId = BiometricDevices.DefaultDeviceID
		else
			if (!BiometricDevices.config.biometricDevices.hasOwnProperty(deviceId)) throw "Invalid biometric device ID"

		let device = await BiometricDevices.Device(deviceId)
		await BiometricDevices._Login(device)
		await device.DeleteMember(memberId)
		return true
	}
	/**
	*Member Freeze
	*
	* @static
	* @param {(string| null)} deviceId OPTIONAL
	* device ID
	* defaults to default device
	* @param {string} memberId Member Id
	* @returns {Promise<boolean>} true if success
	* @memberof BiometricDevices
	*/
	public static async FreezeMember(deviceId: string| null, memberId: string): Promise<boolean>{
		BiometricDevices.log.verbose("try freezing member", { memberId })
		if (deviceId === null) deviceId = BiometricDevices.DefaultDeviceID
		else
			if (!BiometricDevices.config.biometricDevices.hasOwnProperty(deviceId)) throw "Invalid biometric device ID"

		let device = await BiometricDevices.Device(deviceId)
		await BiometricDevices._Login(device)
		await device.FreezeMember(memberId)
		return true
	}
	/**
	*Member Unfreeze
	*
	* @static
	* @param {(string| null)} deviceId OPTIONAL
	* device ID
	* defaults to default device
	* @param {string} memberId Member Id
	* @returns {Promise<boolean>} true if success
	* @memberof BiometricDevices
	*/
	public static async UnfreezeMember(deviceId: string| null, memberId: string): Promise<boolean>{
		BiometricDevices.log.verbose("try unfreezing member", { memberId })
		if (deviceId === null) deviceId = BiometricDevices.DefaultDeviceID
		else
			if (!BiometricDevices.config.biometricDevices.hasOwnProperty(deviceId)) throw "Invalid biometric device ID"

		let device = await BiometricDevices.Device(deviceId)
		await BiometricDevices._Login(device)
		await device.UnfreezeMember(memberId)
		return true
	}
	/**
	*Member Unfreeze
	*
	* @static
	* @param {(string| null)} deviceId OPTIONAL
	* device ID
	* defaults to default device
	* @param {string} memberId Member Id
	* @returns {Promise<boolean>} true if success
	* @memberof BiometricDevices
	*/
	public static async ScanFingerprint(deviceId: string| null, memberId: string): Promise<boolean>{
		BiometricDevices.log.verbose("try Sacnning fingerprint", { memberId })
		if (deviceId === null) deviceId = BiometricDevices.DefaultDeviceID
		else
			if (!BiometricDevices.config.biometricDevices.hasOwnProperty(deviceId)) throw "Invalid biometric device ID"

		let device = await BiometricDevices.Device(deviceId)
		await BiometricDevices._Login(device)
		await device.ScanFingerprint(memberId)
		return true
	}

	/**
	 * Scan for devies with configuration
	 *
	 * @static
	 * @param {SupportedBiometricDevice} type device type
	 * @param {BiometricDeviceOptions} option device options
	 * @param {{ username: string, password: string }} credentials device credentials
	 * @returns {Promise<{ [I: string]: string }>} device list
	 * @memberof BiometricDevices
	 */
	public static async ScanForDevices(
		type: SupportedBiometricDevice,
		option: BiometricDeviceOptions,
		credentials: { username: string, password: string }
	): Promise<{ [I: string]: TBiometricDetails }>{
		try {
			BiometricDevices.log.verbose("scan for biometric device of type", type)
			let device = new InstanceList[type](option)
			await device.Initialize()
			await device.Login(credentials.username, credentials.password)
			return await device.ScanDevices()
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "Unable to Scan for devices"
		}
	}
	/**
	 * Get Status for all the devices
	 *
	 * @static
	 * @returns {Promise<{ [name: string]: TBiometricDetails }>}
	 * @memberof BiometricDevices
	 */
	public static async StatusAll(): Promise<{ [name: string]: TBiometricDetails }>{
		try {
			BiometricDevices.log.verbose("get all device status")
			let device = await BiometricDevices.Device(BiometricDevices.DefaultDeviceID)
			await device.Initialize()
			await BiometricDevices._Login(device)
			let status:{ [name: string]: TBiometricDetails } = {}
			let [ devices, statuses, ] = await Promise.all([
				BiometricDevices.Devices(),
				device.StatusAll(),
			])
			for (const name in devices) {
				if (devices.hasOwnProperty(name)) {
					const d = devices[name]
					if(statuses.hasOwnProperty(d.serial))
						status[name] = statuses[d.serial]
				}
			}
			return status
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "Unable to Scan for devices"
		}
	}
	/**
	 * List zones list
	 *
	 * @static
	 * @param {SupportedBiometricDevice} type
	 * @param {BiometricDeviceOptions} option
	 * @param {{ username: string, password: string }} credentials
	 * @returns {Promise<{ [I: string]: string }>}
	 * @memberof BiometricDevices
	 */
	public static async listZonesFromDevice(
		type: SupportedBiometricDevice,
		option: BiometricDeviceOptions,
		credentials: { username: string, password: string }
	): Promise<{ [I: string]: string }>{
		try {
			BiometricDevices.log.verbose("list of zones", type)
			let device = new InstanceList[type](option)
			await device.Initialize()
			await device.Login(credentials.username, credentials.password)
			return await device.listZones()
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "Unable to Scan for devices"
		}
	}

	public static async listZones(){ return BiometricDevices.Zones }

}