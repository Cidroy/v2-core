import { SupportedBiometricDevice, BiometricDeviceOptions } from "@neutron/supported-biometric-devices"
import { TBiometricDetails } from "@neutron/lib/IBiometric"
import { ISuccess, IError } from "@plugins/gymkonnect/interfaces/IResponse"
import { Logger } from "@classes/CONSOLE"
import BiometricDevices from "@neutron/lib/biometric"

export default class Device{
	private static log = new Logger("positron/Biometric/Device")

	public static async ScanDevice(
		type: SupportedBiometricDevice,
		options: BiometricDeviceOptions,
		credentials: { username: string, password: string },
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
}