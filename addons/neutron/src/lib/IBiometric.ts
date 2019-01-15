import { SupportedBiometricDevice } from "@neutron/supported-biometric-devices"

/**
 * User details required for biometric integration
 */
export type BiometricMemberDetails = {
	name: string
	gender ?: string
	birthday ?: Date
	address ?: string
	phone ?: string
	mobile ?: string
	title ?: string
	company ?: string
	department ?: string
	privilage ?: number
	accessGroup ?: number
}

/**
 * Base Interface for all Biometric Device API
 *
 * @export
 * @interface IBiometric
 */
export default interface IBiometric{
	/**
	 * default data for all the devices
	 * @access Private
	 * @static
	 * @type {{
	 * 		company: string
	 * 		department: string
	 * 		privilage : number
	 * 		accessGroup : number
	 * 	}}
	 * @memberof IBiometric
	 */
	defaults: {
		company: string
		department: string
		privilage : number
		accessGroup : number
	}
	/**
	 * get device name
	 * @readonly
	 * @type {string}
	 * @memberof IBiometric
	 */
	readonly DeviceName: string
	/**
	 * the devicetype class
	 *
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
	 * Initialize the device
	 *
	 * @returns {Promise<boolean>}
	 * @memberof IBiometric
	 */
	Initialize(): Promise<boolean>
	/**
	 * Login for device access
	 *
	 * @param {string} username username
	 * @param {string} password password
	 * @param {object} [options] additional parameters
	 * @returns {Promise<boolean>} resolves true if successfull
	 * @memberof IBiometric
	 */
	Login(username: string, password: string, options?: object): Promise<boolean>
	/**
	 * Add member to device
	 *
	 * @param {string} id unique id
	 * @param {BiometricMemberDetails} details user info
	 * @returns {Promise<boolean>} resolves true if successfull
	 * @memberof IBiometric
	 */
	AddMember(id: string, details: BiometricMemberDetails): Promise<boolean>
	/**
	 * Permanently Delete a user
	 *
	 * @param {string} id user id
	 * @returns {Promise<boolean>} resolves true if successfull
	 * @memberof IBiometric
	 */
	DeleteMember(id: string): Promise<boolean>
	/**
	 * Freeze a User temporarily
	 *
	 * @param {string} id user id
	 * @returns {Promise<boolean>} resolves true if successfull
	 * @memberof IBiometric
	 */
	FreezeMember(id: string): Promise<boolean>
	/**
	 * Unfreeze a member
	 *
	 * @param {string} id user id
	 * @returns {Promise<boolean>} resolves true if successfull
	 * @memberof IBiometric
	 */
	UnfreezeMember(id: string): Promise<boolean>
	/**
	 * Scan fingerprint for user
	 *
	 * @param {string} id user id
	 * @returns {Promise<boolean>} resolves true if successfull
	 * @memberof IBiometric
	 */
	ScanFingerprint(id: string): Promise<boolean>
}