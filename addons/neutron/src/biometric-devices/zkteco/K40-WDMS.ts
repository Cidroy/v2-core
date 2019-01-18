import IBiometric, { BiometricMemberDetails, BIOMETRIC_DEVICE_MODE, BIOMETRIC_DEVICE_CHECK_TYPE } from "@neutron/lib/IBiometric"
import { BiometricPreLoginFailed, BiometricLoginFailed, BiometricUserAddFailed, BiometricUserDeleteFailed, BiometricUserFreezeFailed, BiometricUserUnfreezeFailed, BiometricScanFPFailed } from "@neutron/lib/errors"
import { Logger } from "@classes/CONSOLE"
import { SupportedBiometricDevice } from "@neutron/supported-biometric-devices"
import { WDMSConnectionConfig } from "@neutron/biometric-devices/zkteco/misc"
import BiometricDevices from "@neutron/lib/biometric"
const request = require("request-promise-native").defaults({ simple: false })

export const DefaultWDMS: WDMSConnectionConfig = {
	ssl: false,
	host: "localhost",
	port: 8081,
	DeviceName: "default",
	id: "default",
	zone: Object.keys(BiometricDevices.Zones)[0] || "Unfreezed",
	checkType: BIOMETRIC_DEVICE_CHECK_TYPE.CHECK_IN,
}

/**
 * Login to ZKTEco K40 devices in wdms mode
 *
 * @export
 * @class ZKteco_K40
 * @implements {IBiometric}
 */
export default class ZKTEco_K40_WDMS implements IBiometric {
	protected log: Logger
	private ready: boolean = false
	private _id: string

	private static defaults: {
		company: number;
		department: string;
		privilage: number;
		accessGroup: number;
	} = {
			company: BiometricDevices.Zones.Unfreezed || 0,
			department: "1",
			privilage: 0,
			accessGroup: 1,
		}

	public defaults: {
		company: number;
		department: string;
		privilage: number;
		accessGroup: number;
	} = {
			company: ZKTEco_K40_WDMS.defaults.company,
			department: ZKTEco_K40_WDMS.defaults.department,
			privilage: ZKTEco_K40_WDMS.defaults.privilage,
			accessGroup: ZKTEco_K40_WDMS.defaults.accessGroup,
		}

	private _port: number
	private _host: string
	private _ssl: boolean
	private _deviceName: string
	private _zone: string
	private _checkType: BIOMETRIC_DEVICE_CHECK_TYPE

	private get wdmsURL() { return `http${this._ssl ? "s" : ""}://${this._host}${this._port ? ":" : ""}${this._port}/iclock` }

	public get DeviceName() { return this._deviceName }

	public get DeviceType() { return SupportedBiometricDevice.ZKTECO_K40_WDMS }

	public get ID() { return this._id }

	public get DeviceDetails() {
		return {}
	}

	public async Initialize(): Promise<boolean> {
		this.log.info("initialized OKAY")
		return true
	}

	private async PreLogin(): Promise<boolean> {
		let _options = {
			method: "GET",
			url: `${this.wdmsURL}/accounts/login/`,
			headers: {
				"Cache-Control": "no-cache"
			},
			jar: true,
		}
		try {
			let response = await request(_options)
			this.log.info("pre login OKAY")
			this.log.verbose(response)
			return true
		} catch (error) {
			this.log.error(error)
			throw BiometricPreLoginFailed
		}
	}

	public async Login(username: string, password: string, options?: { [K: string]: string }): Promise<boolean> {
		let _options = {
			method: "POST",
			url: `${this.wdmsURL}/accounts/login/`,
			qs: { next: "/iclock/data/iclock/" },
			headers: {
				"Cache-Control": "no-cache",
				"Content-Type": "application/x-www-form-urlencoded"
			},
			form: {
				this_is_the_login_form: "1",
				post_data: "",
				username,
				password,
			},
			jar: true,
		}
		try {
			await this.PreLogin()
			let response = await request(_options)
			this.log.info("login OKAY")
			this.log.verbose(response)
			this._deviceName = this.DeviceName
			this.ready = true
			return true
		} catch (error) {
			this.log.error(error)
			throw BiometricLoginFailed
		}
	}

	public async AddMember(badgeNumber: string, details: BiometricMemberDetails): Promise<boolean> {
		let _options = {
			method: "POST",
			url: `${this.wdmsURL}/data/employee/_new_/`,
			headers: {
				"Cache-Control": "no-cache",
				"Content-Type": "application/x-www-form-urlencoded",
			},
			form: {
				PIN: badgeNumber,
				company: (details.company ? details.company : this.defaults.company).toString(),
				DeptID: details.department ? details.department : this.defaults.department,
				EName: details.name,
				Password: "",
				Card: "",
				Privilege: details.privilage ? details.privilage : this.defaults.privilage,
				AccGroup: details.accessGroup ? details.accessGroup : this.defaults.accessGroup,
				TimeZones: "0001000100000000",
				Gender: details.gender,
				Birthday: details.birthday,
				Address: details.address,
				PostCode: "",
				Tele: details.phone,
				FPHONE: "",
				Mobile: details.mobile,
				National: "",
				Title: details.title,
			},
			jar: true,
		}
		try {
			let response = await request(_options)
			this.log.info("user add OKAY", badgeNumber, response)
			return true
		} catch (error) {
			this.log.error(error)
			throw BiometricUserAddFailed
		}
	}

	public async DeleteMember(id: string): Promise<boolean> {
		let _options = {
			method: "POST",
			url: `${this.wdmsURL}/data/employee/`,
			qs: { action: "del" },
			headers: {
				"Cache-Control": "no-cache",
				"content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
			},
			formData: { K: id },
			jar: true
		}
		try {
			let response = await request(_options)
			this.log.info("user delete OKAY", id)
			this.log.log(response)
			return true
		} catch (error) {
			this.log.error(error)
			throw BiometricUserDeleteFailed
		}
	}

	public async FreezeMember(id: string): Promise<boolean> {
		if (!BiometricDevices.Zones.Freezed) throw "'Freezed' Zone needs to be added"
		let _options = {
			method: "POST",
			url: `${this.wdmsURL}/data/employee/`,
			qs: { action: "mvToDev", SN: BiometricDevices.Zones.Freezed.toString() },
			headers: {
				"Cache-Control": "no-cache",
				"Content-Type": "application/x-www-form-urlencoded"
			},
			form: { K: id },
			jar: true
		}
		try {
			let response = await request(_options)
			this.log.info("user freeze OKAY", id)
			this.log.verbose(response)
			return true
		} catch (error) {
			this.log.error(error)
			throw BiometricUserFreezeFailed
		}
	}

	public async UnfreezeMember(id: string): Promise<boolean> {
		if (!BiometricDevices.Zones.Unfreezed) throw "'Unfreezed' Zone needs to be added"
		let _options = {
			method: "POST",
			url: `${this.wdmsURL}/data/employee/`,
			qs: { action: "mvToDev", SN: BiometricDevices.Zones.Unfreezed.toString() },
			headers: {
				"Cache-Control": "no-cache",
				"Content-Type": "application/x-www-form-urlencoded"
			},
			form: { K: id },
			jar: true
		}
		try {
			let response = await request(_options)
			this.log.info("user unfreeze OKAY", id)
			this.log.verbose(response)
			return true
		} catch (error) {
			this.log.error(error)
			throw BiometricUserUnfreezeFailed
		}
	}

	public async ScanFingerprint(id: string): Promise<boolean> {
		let _options = {
			method: "POST",
			url: `${this.wdmsURL}/data/employee/`,
			qs: { action: "enroll", SN: this.DeviceName },
			headers: {
				"Cache-Control": "no-cache",
				"content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
			},
			formData: { K: id },
			jar: true
		}
		try {
			let response = await request(_options)
			this.log.info("scan fingerprint OKAY", id)
			this.log.verbose(response)
			return true
		} catch (error) {
			this.log.error(error)
			throw BiometricScanFPFailed
		}
	}

	public async AddMemberZone(id: string, zoneName: string): Promise<boolean> {
		if (!BiometricDevices.Zones.hasOwnProperty(zoneName)) throw "Zone name does not exists"
		let zoneID = BiometricDevices.Zones[zoneName]
		// FIXME:
		return true
	}

	public async MoveMemberZone(id: string, zoneName: string): Promise<boolean> {
		if (!BiometricDevices.Zones.hasOwnProperty(zoneName)) throw "Zone name does not exists"
		let zoneID = BiometricDevices.Zones[zoneName]
		// FIXME:
		return true
	}

	public async RemoveMemberZone(id: string, zoneName: string): Promise<boolean> {
		if (!BiometricDevices.Zones.hasOwnProperty(zoneName)) throw "Zone name does not exists"
		let zoneID = BiometricDevices.Zones[zoneName]
		// FIXME:
		return true
	}

	public async SetZone(zoneName: string): Promise<boolean> {
		if (!BiometricDevices.Zones.hasOwnProperty(zoneName)) throw "Zone name does not exists"
		let zoneID = BiometricDevices.Zones[zoneName]
		// FIXME: set zone for this device
		this._zone = zoneName
		return true
	}

	public async AddZone(zoneName: string, options?: { id?: number }): Promise<number> {
		try {
			let id: number = 0
			if (options) {
				if (options.id) id = options.id - 1
			}
			id = id === 0 ? Object.values(BiometricDevices.Zones).sort().reverse()[0] || 0 : id
			++id
			// FIXME: add zone rest api
			return id
		} catch (error) {
			this.log.error(error)
			throw new Error("Unable to add Zone")
		}
	}

	public async EditZone(zoneName: string, options?: any): Promise<boolean> {
		// FIXME: add zone editing logic here
		throw new Error("Method not implemented.")
	}

	public async DeleteZone(zoneName: string): Promise<boolean> {
		let zoneId = BiometricDevices.Zones[zoneName]
		// FIXME: add delete zone logic here
		throw new Error("Method not implemented.")
	}

	public get Zone(): string | null { return this._zone ? this._zone : null }

	public get Mode() {
		return BiometricDevices.DefaultDeviceID === this._id ?
			BIOMETRIC_DEVICE_MODE.MASTER :
			BIOMETRIC_DEVICE_MODE.SLAVE
	}

	public get CheckType() { return this._checkType }

	constructor(wdms: WDMSConnectionConfig) {
		this._deviceName = wdms.DeviceName
		this.log = new Logger(`${this.DeviceName}@zkteco-k40-wdms`)
		try {
			this._id = wdms.id
			this._ssl = wdms.ssl
			this._host = wdms.host
			this._port = wdms.port
			this._zone = wdms.zone
			this._checkType = wdms.checkType

		} catch (error) {
			this.log.error(error)
			this.log.log("Incorrect Config to connect with ZKTEco K40 over WDMS")

			this._id = DefaultWDMS.id
			this._ssl = DefaultWDMS.ssl
			this._host = DefaultWDMS.host
			this._port = DefaultWDMS.port
			this._zone = DefaultWDMS.zone
			this._checkType = DefaultWDMS.checkType
		}
	}
}