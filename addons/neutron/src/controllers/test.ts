import * as API from "@tsed/common"
import { Logger } from "@classes/CONSOLE"
import { ISuccess, IError } from "@classes/interface/IResponse"
import BiometricDevices from "@neutron/lib/biometric"
import { TBiometricMemberDetails, TBiometricDetails } from "@neutron/lib/IBiometric"
import { SupportedBiometricDevice, BiometricDeviceOptions } from "@neutron/supported-biometric-devices"

@API.Controller("/test")
export class TestController{
	private log = new Logger("api/test")

	@API.Authenticated({ "neutron/core": "test" })
	@API.Post("/")
	public async test(
		@API.BodyParams("id") id: string,
	): Promise<ISuccess | IError>{
		try {
			this.log.verbose("testing")
			return { type: "success" }
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}

	@API.Authenticated({ "neutron/core": "test" })
	@API.Post("/member/add")
	public async addMember(
		@API.BodyParams("id") id: string| null | undefined,
		@API.BodyParams("badgeNumber") badgeNumber: string,
		@API.BodyParams("details") details: TBiometricMemberDetails,
	): Promise<ISuccess | IError> {
		try {
			this.log.verbose("testing member add")
			if(!id) id = null
			await BiometricDevices.Initialize()
			await BiometricDevices.Addmember(id, badgeNumber, details)
			return { type: "success" }
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}
	@API.Authenticated({ "neutron/core": "test" })
	@API.Post("/member/delete")
	public async deleteMember(
		@API.BodyParams("deviceId") deviceId: string| null | undefined,
		@API.BodyParams("memberId") memberId: string,
	): Promise<ISuccess | IError> {
		try {
			this.log.verbose("testing member delete"+memberId)
			if (!deviceId) deviceId = null
			await BiometricDevices.Initialize()
			await BiometricDevices.DeleteMember(deviceId, memberId)
			return { type: "success" }
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}
	@API.Authenticated({ "neutron/core": "test" })
	@API.Post("/member/freeze")
	public async FreezeMember(
		@API.BodyParams("deviceId") deviceId: string| null | undefined,
		@API.BodyParams("memberId") memberId: string,
	): Promise<ISuccess | IError> {
		try {
			this.log.verbose("testing member freeze"+memberId)
			if (!deviceId) deviceId = null
			await BiometricDevices.Initialize()
			await BiometricDevices.FreezeMember(deviceId, memberId)
			return { type: "success" }
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}
	@API.Authenticated({ "neutron/core": "test" })
	@API.Post("/member/unfreeze")
	public async UnfreezeMember(
		@API.BodyParams("deviceId") deviceId: string| null | undefined,
		@API.BodyParams("memberId") memberId: string,
	): Promise<ISuccess | IError> {
		try {
			this.log.verbose("testing member unfreeze"+memberId)
			if (!deviceId) deviceId = null
			await BiometricDevices.Initialize()
			await BiometricDevices.UnfreezeMember(deviceId, memberId)
			return { type: "success" }
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}
	@API.Authenticated({ "neutron/core": "test" })
	@API.Post("/member/scan")
	public async ScanFingerprint(
		@API.BodyParams("deviceId") deviceId: string| null | undefined,
		@API.BodyParams("memberId") memberId: string,
	): Promise<ISuccess | IError> {
		try {
			this.log.verbose("testing member fingerprint scan"+memberId)
			if (!deviceId) deviceId = null
			await BiometricDevices.Initialize()
			await BiometricDevices.ScanFingerprint(deviceId, memberId)
			return { type: "success" }
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}
	@API.Authenticated({ "neutron/core": "test" })
	@API.Post("/member/add/zone")
	public async AddMemberZone(
		@API.BodyParams("deviceId") deviceId: string| null | undefined,
		@API.BodyParams("memberId") memberId: string,
		@API.BodyParams("zoneName") zoneName: string,
	): Promise<ISuccess | IError> {
		try {
			this.log.verbose("testing member zone add " + memberId +"   "+ zoneName)
			if (!deviceId) deviceId = null
			await BiometricDevices.Initialize()
			await BiometricDevices.AddMemberZone(deviceId, memberId, zoneName)
			return { type: "success" }
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}
	@API.Authenticated({ "neutron/core": "test" })
	@API.Post("/member/move/zone")
	public async MoveMemberZone(
		@API.BodyParams("deviceId") deviceId: string| null | undefined,
		@API.BodyParams("memberId") memberId: string,
		@API.BodyParams("zoneName") zoneName: string,
	): Promise<ISuccess | IError> {
		try {
			this.log.verbose("testing member move to zone " , memberId , zoneName)
			if (!deviceId) deviceId = null
			await BiometricDevices.Initialize()
			await BiometricDevices.MoveMemberZone(deviceId, memberId, zoneName)
			return { type: "success" }
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}
	@API.Authenticated({ "neutron/core": "test" })
	@API.Post("/add/zone")
	public async AddZone(
		@API.BodyParams("zoneName") zoneName: string,
	): Promise<ISuccess | IError> {
		try {
			this.log.verbose("adding zone " , zoneName)
			// if (!deviceId) deviceId = null
			await BiometricDevices.Initialize()
			await BiometricDevices.AddZone(  zoneName)
			return { type: "success" }
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}
	@API.Authenticated({ "neutron/core": "test" })
	@API.Post("/delete/zone")
	public async DeleteZone(
		@API.BodyParams("zoneName") zoneName: string,
	): Promise<ISuccess | IError> {
		try {
			this.log.verbose("deleting zone " , zoneName)
			await BiometricDevices.Initialize()
			await BiometricDevices.DeleteZone(  zoneName)
			return { type: "success" }
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}
	@API.Authenticated({ "neutron/core": "test" })
	@API.Post("/device/scan")
	public async ScanDevice(
		@API.BodyParams("type") type: SupportedBiometricDevice,
		@API.BodyParams("options") options: BiometricDeviceOptions,
		@API.BodyParams("credentials") credentials: { username: string, password: string },
	): Promise<({ devices: { [I: string]: TBiometricDetails } } & ISuccess) | IError>{
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
	@API.Authenticated({ "neutron/core": "test" })
	@API.Post("/device/status/all")
	public async StatusAll(): Promise<({ devices: { [I: string]: TBiometricDetails } } & ISuccess) | IError>{
		try {
			this.log.verbose("scaning device")
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
	@API.Authenticated({ "neutron/core": "test" })
	@API.Post("/zones/list")
	public async listZones(
		@API.BodyParams("type") type: SupportedBiometricDevice,
		@API.BodyParams("options") options: BiometricDeviceOptions,
		@API.BodyParams("credentials") credentials: { username: string, password: string },
	): Promise<({ zones: { [I: string]: string } } & ISuccess) | IError>{
		try {
			this.log.verbose("list of zones")
			await BiometricDevices.Initialize()
			let zones = await BiometricDevices.listZones(type, options, credentials)
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