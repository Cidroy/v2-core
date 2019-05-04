import BiometricDevices from "@neutron/lib/biometric"
import { Logger } from "@classes/CONSOLE"
import { TBiometricMemberDetails } from "@neutron/lib/IBiometric"
import { ISuccess, IError } from "@plugins/gymkonnect/interfaces/IResponse"

export default class Member{
	private static log = new Logger("positron/Biometric/Member")

	public static async add(
		badgeNumber: string,
		details: TBiometricMemberDetails,
		deviceId?: string | null | undefined,
	): Promise<ISuccess | IError>
	{
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

	public static async delete(
		memberId: string,
		deviceId?: string | null | undefined,
	): Promise<ISuccess | IError>{
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

	public static async freeze(
		memberId: string,
		deviceId?: string | null |undefined
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
	public static async Unfreeze(
		memberId: string,
		deviceId?: string | null |undefined
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
	public static async AddMemberZone(
		memberId: string,
		zoneName: string,
		id: string | null | undefined,
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
	public static async MoveMemberZone(
		memberId: string,
		zoneName: string,
		id: string | null | undefined,
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
	public static async ScanFingerprint(
		memberId: string,
		deviceId?: string | null |undefined
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

}
