import { SupportedBiometricDevice } from "@neutron/supported-biometric-devices"
import { DEVICE_STATE } from "@neutron/lib/device-state"

export enum BIOMETRIC_DEVICE_MODE{
	MASTER = "MASTER",
	SLAVE = "SLAVE",
}

export enum BIOMETRIC_DEVICE_CHECK_TYPE{
	CHECK_IN = "CHECK_IN",
	CHECK_OUT = "CHECK_OUT",
}

/**
 * User details required for biometric integration
 */
export type TBiometricMemberDetails = {
	name: string
	gender ?: string
	birthday ?: Date
	address ?: string
	phone ?: string
	mobile ?: string
	title ?: string
	company ?: number
	department ?: string
	privilage ?: number
	accessGroup ?: number
}

export type TBiometricDetails = {
	serial: string,
	ip: string,
	state: DEVICE_STATE,
	name: string,
	zoneId: number,
	zoneName: string,
	[J: string]: any,
}

/**
 * Base Interface for all Biometric Device API
 *
 * TODO: implement static ``requires`` so that frontend knows what is needed by this device type
 * ```ts
	interface IBiometricOptions{
		credentials: true // if needs login credentials
		...
	}
	public static get REQUIRES(){
		let req: IBiometricOptions
		return req
	}
 ```
 * @export
 * @interface IBiometric
 */
export default interface IBiometric{
	/**
	 * default data for all the devices
	 * @private
	 * @static
	 * @type {{
	 * 		company: number
	 * 		department: string
	 * 		privilage : number
	 * 		accessGroup : number
	 * 	}}
	 * @memberof IBiometric
	 */
	defaults: {
		company: number
		department: string
		privilage : number
		accessGroup : number
	}
	/**
	 * Device ID as per neutron
	 * @type {string}
	 * @memberof IBiometric
	 */
	readonly ID: string
	/**
	 * get device name
	 * @readonly
	 * @type {string}
	 * @memberof IBiometric
	 */
	readonly DeviceName: string
	/**
	 * the devicetype class
	 * @readonly
	 * @type {SupportedBiometricDevice}
	 * @memberof IBiometric
	 */
	readonly DeviceType: SupportedBiometricDevice
	/**
	 * get device details
	 * @readonly
	 * @type {object}
	 * @memberof IBiometric
	 */
	readonly DeviceDetails: object
	/**
	 * Get Zone for the current device
	 * @readonly
	 * @type {(string | null)}
	 * @memberof IBiometric
	 */
	readonly Zone: string | null
	/**
	 * Get Device Operation Mode
	 * @readonly
	 * @type {BIOMETRIC_DEVICE_MODE}
	 * @memberof IBiometric
	 */
	readonly Mode: BIOMETRIC_DEVICE_MODE
	/**
	 * Get device check mode
	 * i.e. Checkin device or Checkout device
	 * @readonly
	 * @type {BIOMETRIC_DEVICE_CHECK_TYPE}
	 * @memberof IBiometric
	 */
	readonly CheckType: BIOMETRIC_DEVICE_CHECK_TYPE
	/**
	 * returns IP of the device
	 *@readonly
	 * @type {string}
	 * @memberof IBiometric
	 */
	readonly IP: string
	/**
	 * Initialize the device
	 * @returns {Promise<boolean>}
	 * @memberof IBiometric
	 */
	
	Initialize(): Promise<boolean>
	/**
	 * Login for device access
	 * @param {string} username username
	 * @param {string} password password
	 * @param {object} [options] additional parameters
	 * @returns {Promise<boolean>} resolves true if successfull
	 * @memberof IBiometric
	 */
	Login(username: string, password: string, options?: object): Promise<boolean>
	/**
	 * Add member to device
	 * @param {string} id unique id
	 * @param {TBiometricMemberDetails} details user info
	 * @returns {Promise<boolean>} resolves true if successfull
	 * @memberof IBiometric
	 */
	AddMember(id: string, details: TBiometricMemberDetails): Promise<boolean>
	/**
	 * Permanently Delete a user
	 * @param {string} id user id
	 * @returns {Promise<boolean>} resolves true if successfull
	 * @memberof IBiometric
	 */
	DeleteMember(id: string): Promise<boolean>
	/**
	 * Freeze a User temporarily
	 * @param {string} id user id
	 * @returns {Promise<boolean>} resolves true if successfull
	 * @memberof IBiometric
	 */
	FreezeMember(id: string): Promise<boolean>
	/**
	 * Unfreeze a member
	 * @param {string} id user id
	 * @returns {Promise<boolean>} resolves true if successfull
	 * @memberof IBiometric
	 */
	UnfreezeMember(id: string): Promise<boolean>
	/**
	 * Grant Member to a new zone.
	 * Allows User to access multiple zone
	 * @param {string} id Member ID
	 * @param {string} zoneName Zone Name
	 * @returns {Promise<boolean>} true if success
	 * @memberof IBiometric
	 */
	AddMemberZone(id: string, zoneName: string): Promise<boolean>
	/**
	 * Change Member's Zone to another another Zone
	 * Looses Access to Previous Zone
	 * @param {string} id Member id
	 * @param {string} zoneName Zone Name
	 * @returns {Promise<boolean>} true if success
	 * @memberof IBiometric
	 */
	MoveMemberZone(id: string, zoneName: string): Promise<boolean>
	/**
	 * Remove member from specific Zone
	 * @param {string} id Member id
	 * @param {string} zoneName Zone name
	 * @returns {Promise<boolean>} true if success
	 * @memberof IBiometric
	 */
	RemoveMemberZone(id: string, zoneName: string): Promise<boolean>
	/**
	 * Scan fingerprint for user
	 * @param {string} id user id
	 * @returns {Promise<boolean>} resolves true if successfull
	 * @memberof IBiometric
	 */
	ScanFingerprint(id: string): Promise<boolean>
	/**
	 * Set the devices' zone
	 * @param {string} zoneName
	 * @returns {Promise<boolean>}
	 * @memberof IBiometric
	 */
	SetZone(zoneName: string): Promise<boolean>
	/**
	 * Add Zone to device
	 * @param {string} zoneName Zone name
	 * @param {*} [options] additional options
	 * @returns {Promise<number>} Zone ID
	 * @memberof IBiometric
	 */
	AddZone(zoneName: string, options?: any): Promise<number>
	/**
	 * Edit Zone Info
	 * @param {string} zoneName Zone name
	 * @param {*} [options] additional options
	 * @returns {Promise<boolean>} true if success
	 * @memberof IBiometric
	 */
	EditZone(zoneName: string, options?: any): Promise<boolean>
	/**
	 * Delete Zone
	 * @param {string} zoneName Zone name
	 * @returns {Promise<boolean>} true if success
	 * @memberof IBiometric
	 */
	DeleteZone(zoneName: string): Promise<boolean>
	/**
	 * Scan for other devices
	 * @returns {Promise<{ [I: string]: string }>}
	 * @memberof IBiometric
	 */
	ScanDevices(): Promise<{ [serial: string]: TBiometricDetails }>
	/**
	 * Get Status of all registered biometric devices
	 *
	 * @returns {Promise<{ [I: string]: TBiometricDetails }>}
	 * @memberof IBiometric
	 */
	StatusAll(): Promise<{ [serial: string]: TBiometricDetails }>
}