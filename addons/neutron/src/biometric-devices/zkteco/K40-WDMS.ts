import IBiometric, { BiometricMemberDetails } from "@neutron/lib/IBiometric"
import { BiometricPreLoginFailed, BiometricLoginFailed, BiometricUserAddFailed, BiometricUserDeleteFailed, BiometricUserFreezeFailed, BiometricUserUnfreezeFailed, BiometricScanFPFailed } from "@neutron/lib/errors"
import { Logger } from "@classes/CONSOLE"
import { SupportedBiometricDevice } from "@neutron/supported-biometric-devices"
import { WDMSConnectionConfig } from "@neutron/biometric-devices/zkteco/misc"
const request = require("request-promise-native").defaults({ simple: false })

export const DefaultWDMS: WDMSConnectionConfig = {
	ssl: false,
	host: "localhost",
	port: 8081,
	Zones: {
		Freezed: "2",
		Unfreezed: "2",
	},
	DeviceName: "default"
}

/**
 * Login to ZKTEco K40 devices in wdms mode
 *
 * @export
 * @class ZKteco_K40
 * @implements {IBiometric}
 */
export default class ZKTEco_K40_WDMS implements IBiometric{
	protected log: Logger
	private ready: boolean = false
	
	private static defaults: {
		company: string;
		department: string;
		privilage: number;
		accessGroup: number;
	} = {
		company: "1",
		department: "1",
		privilage: 0,
		accessGroup: 1,
	}

	public defaults: {
		company: string;
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
	private _freezedZone: string
	private _unfreezedZone: string
	private _deviceName: string
	
	private get wdmsURL() { return `http${this._ssl ? "s" : ""}://${this._host}${this._port?":":""}${this._port}/iclock` }
	
	public get DeviceName() { return this._deviceName }
	
	public get DeviceType() { return SupportedBiometricDevice.ZKTECO_K40_WDMS }
	
	public get DeviceDetails(){
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
				company: details.company ? details.company : this.defaults.company,
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
		let _options = {
			method: "POST",
			url: `${this.wdmsURL}/data/employee/`,
			qs: { action: "mvToDev", SN: this._freezedZone },
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
		let _options = {
			method: "POST",
			url: `${this.wdmsURL}/data/employee/`,
			qs: { action: "mvToDev", SN: this._unfreezedZone },
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

	constructor(wdms: WDMSConnectionConfig){
		this._deviceName = wdms.DeviceName
		this.log = new Logger(`${this.DeviceName}@zkteco-k40-wdms`)
		try {
			this._ssl = wdms.ssl
			this._host = wdms.host
			this._port = wdms.port
			this._freezedZone = wdms.Zones.Freezed //2
			this._unfreezedZone = wdms.Zones.Unfreezed //1
			
		} catch (error) {
			this.log.error(error)
			this.log.log("Incorrect Config to connect with ZKTEco K40 over WDMS")

			this._ssl = DefaultWDMS.ssl
			this._host = DefaultWDMS.host
			this._port = DefaultWDMS.port
			this._freezedZone = DefaultWDMS.Zones.Freezed //2
			this._unfreezedZone = DefaultWDMS.Zones.Unfreezed //1
		}
	}
}