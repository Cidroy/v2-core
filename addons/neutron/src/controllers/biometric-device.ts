import * as API from "@tsed/common"
import BiometricDevices from "@neutron/lib/biometric"
import { Logger } from "@classes/CONSOLE"
import { ISuccess, IError } from "@plugins/core/interfaces/IResponse"
import { TBiometricMemberDetails } from "@neutron/lib/IBiometric"

/**
 * Controller for device level interaction
 *
 * @export
 * @class BiometricDeviceController
 */
@API.Controller("/biometric-device")
export class BiometricDeviceController{
	private log = new Logger("api/biometric-devices")

	/**
	 * Add Login details for Device
	 *
	 * @permission { "neutron/biometric-device": "credentials|add" }
	 * @param {string} id device id
	 * @param {string} username usernamw
	 * @param {string} password password
	 * @returns {(Promise<ISuccess | IError>)} response
	 * @memberof BiometricDeviceController
	 */
	@API.Authenticated({ "neutron/biometric-device": "credentials|add" })
	@API.Post("/credentials/add")
	public async addCredentials(
		@API.BodyParams("id") id: string,
		@API.BodyParams("username") username: string,
		@API.BodyParams("password") password: string,
	): Promise<ISuccess | IError>{
		try {
			if(!id) throw "ID is required."
			if(!username) throw "Username is required."
			if(!password) throw "Password is required."
			await BiometricDevices.Initialize()
			let success = await BiometricDevices.SaveCredentials(id, username, password)
			if(!success) throw "Unable to save biometric device credential"
			return { type: "success" }
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}

	/**
	 * Add Member to device
	 *
	 * @permission { "neutron/biometric-device": "member|add" }
	 * @param {(string | null | undefined)} deviceId device id. defaaults to default
	 * @param {string} badgeNumber badgenumber
	 * @param {TBiometricMemberDetails} details member details
	 * @returns {(Promise<ISuccess | IError>)} response
	 * @memberof BiometricDeviceController
	 */
	@API.Authenticated({ "neutron/biometric-device": "member|add" })
	@API.Post("/member/add")
	public async addMember(
		@API.BodyParams("deviceId") deviceId: string | null | undefined,
		@API.BodyParams("badgeNumber") badgeNumber: string,
		@API.BodyParams("details") details: TBiometricMemberDetails,
	): Promise<ISuccess | IError> {
		try {
			this.log.verbose(`device ${deviceId} add member ${badgeNumber}`)
			if (!deviceId) deviceId = null
			await BiometricDevices.Initialize()
			await BiometricDevices.Addmember(deviceId, badgeNumber, details)
			return { type: "success" }
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}

	/**
	 * Delete member from device
	 * @permission { "neutron/biometric-device": "member|delete" }
	 * @param {(string | null | undefined)} deviceId device id
	 * @param {string} memberId member id. not same as badgenumber
	 * @returns {(Promise<ISuccess | IError>)} response
	 * @memberof BiometricDeviceController
	 */
	@API.Authenticated({ "neutron/biometric-device": "member|delete" })
	@API.Post("/member/delete")
	public async deleteMember(
		@API.BodyParams("deviceId") deviceId: string | null | undefined,
		@API.BodyParams("memberId") memberId: string,
	): Promise<ISuccess | IError> {
		try {
			this.log.verbose(`device ${deviceId} delete member ${memberId} by id`)
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

	/**
	 * Device freeze member
	 *
	 * @permission { "neutron/biometric-device": "member|freeze" }
	 * @param {(string | null | undefined)} deviceId device id
	 * @param {string} memberId member id
	 * @returns {(Promise<ISuccess | IError>)} response
	 * @memberof BiometricDeviceController
	 */
	@API.Authenticated({ "neutron/biometric-device": "member|freeze" })
	@API.Post("/member/freeze")
	public async FreezeMember(
		@API.BodyParams("deviceId") deviceId: string | null | undefined,
		@API.BodyParams("memberId") memberId: string,
	): Promise<ISuccess | IError> {
		try {
			this.log.verbose(`device ${deviceId} freeze member ${memberId} by id`)
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

	/**
	 * Device Unfreeze Member by ID
	 *
	 * @permission { "neutron/biometric-device": "member|unfreeze" }
	 * @param {(string | null | undefined)} deviceId device id
	 * @param {string} memberId member id
	 * @returns {(Promise<ISuccess | IError>)} response
	 * @memberof BiometricDeviceController
	 */
	@API.Authenticated({ "neutron/biometric-device": "member|unfreeze" })
	@API.Post("/member/unfreeze")
	public async UnfreezeMember(
		@API.BodyParams("deviceId") deviceId: string | null | undefined,
		@API.BodyParams("memberId") memberId: string,
	): Promise<ISuccess | IError> {
		try {
			this.log.verbose(`device ${deviceId} unfreeze member ${memberId}`)
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

	/**
	 * Scan fingerprint for member by id
	 *
	 * @permisssion { "neutron/biometric-device": "member|scan-fingerprint" }
	 * @param {(string | null | undefined)} deviceId device id
	 * @param {string} memberId member id
	 * @returns {(Promise<ISuccess | IError>)} response
	 * @memberof BiometricDeviceController
	 */
	@API.Authenticated({ "neutron/biometric-device": "member|scan-fingerprint" })
	@API.Post("/member/scan-fingerprint")
	public async ScanFingerprint(
		@API.BodyParams("deviceId") deviceId: string | null | undefined,
		@API.BodyParams("memberId") memberId: string,
	): Promise<ISuccess | IError> {
		try {
			this.log.verbose(`device ${deviceId} scan fingerprint of member ${memberId}`)
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

	/**
	 * Add Zone to member by id
	 *
	 * @permission { "neutron/biometric-device": "member|add-zone" }
	 * @param {(string | null | undefined)} id device id
	 * @param {string} memberId member id
	 * @param {string} zoneName zone name
	 * @returns {(Promise<ISuccess | IError>)} response
	 * @memberof BiometricDeviceController
	 */
	@API.Authenticated({ "neutron/biometric-device": "member|add-zone" })
	@API.Post("/member/add/zone")
	public async AddMemberZone(
		@API.BodyParams("id") id: string | null | undefined,
		@API.BodyParams("memberId") memberId: string,
		@API.BodyParams("zoneName") zoneName: string,
	): Promise<ISuccess | IError> {
		try {
			this.log.verbose(`device ${id} add zone ${zoneName} to member ${memberId}`)
			if (!id) id = null
			await BiometricDevices.Initialize()
			await BiometricDevices.AddMemberZone(id, memberId, zoneName)
			return { type: "success" }
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}

	/**
	 * Move member from current zone to destination zone
	 *
	 * @permission { "neutron/biometric-device": "member|zone-move" }
	 * @param {(string | null | undefined)} id device id
	 * @param {string} memberId member id
	 * @param {string} zoneName zone name
	 * @returns {(Promise<ISuccess | IError>)} response
	 * @memberof BiometricDeviceController
	 */
	@API.Authenticated({ "neutron/biometric-device": "member|zone-move" })
	@API.Post("/member/move/zone")
	public async MoveMemberZone(
		@API.BodyParams("id") id: string | null | undefined,
		@API.BodyParams("memberId") memberId: string,
		@API.BodyParams("zoneName") zoneName: string,
	): Promise<ISuccess | IError> {
		try {
			this.log.verbose(`device ${id} move member ${memberId} to zone ${zoneName}`)
			if (!id) id = null
			await BiometricDevices.Initialize()
			await BiometricDevices.MoveMemberZone(id, memberId, zoneName)
			return { type: "success" }
		} catch (error) {
			this.log.error(error)
			return {
				type: "error",
				message: error.toString()
			}
		}
	}
}
