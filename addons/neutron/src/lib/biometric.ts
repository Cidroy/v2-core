import { Logger } from "@classes/CONSOLE"
import { SupportedBiometricDevice, BiometricDeviceOptions, InstanceList, TBiometricDevice } from "@neutron/supported-biometric-devices"
import AppConfig from "@classes/appConfig"
import uuid from "uuid/v4"

export default class BiometricDevices {
	protected static Namespace = "neutron/biometric-devices"

	protected static log: Logger = new Logger("biometric-device")

	private static config: {
		defaultBiometricDevice: string| null,
		biometricDevices: { [K: string]: BiometricDeviceOptions & { DeviceType: SupportedBiometricDevice } }
	}
		= {
			defaultBiometricDevice: null,
			biometricDevices: {}
		}

	private static cache = {
		biometricDevices: new Map<string, TBiometricDevice>()
	}

	public static async Initialize() {
		BiometricDevices.config = await AppConfig.Get(BiometricDevices.Namespace)
	}

	private static async SaveDeviceConfig() {
		try {
			await AppConfig.Set(BiometricDevices.Namespace, BiometricDevices.config)
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "unable to save neutron config"
		}
	}

	public static async AddBiometricDevice(id: string| null, type: SupportedBiometricDevice, options: BiometricDeviceOptions): Promise<string> {
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

	public static async EditBiometricDevice(id: string, newOptions: BiometricDeviceOptions): Promise<boolean> {
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

	public static async DeleteBiometricDevice(id: string): Promise<boolean> {
		try {
			if (!BiometricDevices.config.biometricDevices.hasOwnProperty(id)) throw "Invalid biometric device ID"
			delete BiometricDevices.config.biometricDevices[id]
			if(BiometricDevices.config.defaultBiometricDevice === id) BiometricDevices.config.defaultBiometricDevice = null
			await BiometricDevices.SaveDeviceConfig()
			return true
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "Unable to delete biometric settings."
		}
	}

	public static async SetAsDefaultBiometricDevice(id: string): Promise<boolean> {
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

	public static async GetBiometricDevices() { return BiometricDevices.config.biometricDevices }

	public static async GetDefaultBiometricDeviceID() { return BiometricDevices.config.defaultBiometricDevice }

	public static async BiometricDevice(id: string): Promise<TBiometricDevice> {
		try {
			if (!BiometricDevices.config.biometricDevices.hasOwnProperty(id)) throw "Invalid biometric device ID"
			if (BiometricDevices.cache.biometricDevices.has(id)) return <TBiometricDevice>BiometricDevices.cache.biometricDevices.get(id)
			let options = BiometricDevices.config.biometricDevices[id]
			let device = new InstanceList[options.DeviceType](options)
			await device.Initialize()
			BiometricDevices.cache.biometricDevices.set(id, <TBiometricDevice><any>device)
			return <TBiometricDevice><any>device
		} catch (error) {
			BiometricDevices.log.error(error)
			throw "Unable to get device."
		}
	}
}