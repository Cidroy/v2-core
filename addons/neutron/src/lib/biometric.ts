import { Logger } from "@classes/CONSOLE"
import { SupportedBiometricDevice, BiometricDeviceOptions, InstanceList, TBiometricDevices, TBiometricDevice } from "@neutron/supported-biometric-devices"
import AppConfig from "@classes/appConfig"
import uuid from "uuid/v4"

export default class BiometricDevices {
	protected static Namespace = "neutron/biometric-devices"

	protected static log: Logger = new Logger("biometric-device")

	private static config: {
		defaultBiometricDevice: string| null,
		biometricDevices: { [K: string]: BiometricDeviceOptions & { DeviceType: SupportedBiometricDevice } },
		credentials: { [K: string]: { username: string, password: string, } },
	}
		= {
			defaultBiometricDevice: null,
			biometricDevices: {},
			credentials: {},
		}

	private static cache = {
		biometricDevices: new Map<string, TBiometricDevice>(),
	}

	public static async Initialize() {
		BiometricDevices.config = await AppConfig.Get(BiometricDevices.Namespace, BiometricDevices.config)
	}

	private static async SaveDeviceConfig() {
		try {
			await AppConfig.Set(BiometricDevices.Namespace, BiometricDevices.config)
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "unable to save neutron config"
		}
	}

	public static async Add(id: string| null, type: SupportedBiometricDevice, options: BiometricDeviceOptions): Promise<string> {
		try {
			BiometricDevices.log.verbose({ InstanceList, type })
			let test = new InstanceList[type](options)
			await test.Initialize()
			BiometricDevices.log.info(`${type} successfully connected`)
			if(!id) id = uuid()
			BiometricDevices.config.biometricDevices[<string>id] = { ...options, DeviceType: type }
			await BiometricDevices.SaveDeviceConfig()
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
			await BiometricDevices.SaveDeviceConfig()
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
			if(BiometricDevices.config.defaultBiometricDevice === id) BiometricDevices.config.defaultBiometricDevice = null
			if (BiometricDevices.config.credentials.hasOwnProperty(id)) delete BiometricDevices.config.credentials[id]
			await BiometricDevices.SaveDeviceConfig()
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
			await BiometricDevices.SaveDeviceConfig()
			return true
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "Unable to set default biometric device."
		}
	}

	public static async Devices() { return BiometricDevices.config.biometricDevices }

	public static async DefaultDeviceID() { return BiometricDevices.config.defaultBiometricDevice }

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

	public static async SaveCredentials(id: string, username: string, password: string): Promise<boolean>{
		try {
			let device = await BiometricDevices.Device(id)
			let success = await device.Login(username, password)
			if(!success) throw "Unable to login to device."
			BiometricDevices.config.credentials[id] = { username, password, }
			await BiometricDevices.SaveDeviceConfig()
			return true
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "Unable to login to device."
		}
	}

	public static async GetCredentials(id: string): Promise<{ username: string, password: string }>{
		if (!BiometricDevices.config.biometricDevices.hasOwnProperty(id)) throw "Invalid biometric device ID"
		if (!BiometricDevices.config.credentials.hasOwnProperty(id)) throw "This Biometric does not have any credentials."
		return BiometricDevices.config.credentials[id]
	}
}