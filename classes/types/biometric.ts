import { DEVICE_STATE } from "@classes/enum/biometric"

export type TBiometricDetails = {
	serial: string,
	ip: string,
	state: DEVICE_STATE,
	name: string,
	zoneId: number,
	zoneName: string,
	[J: string]: any,
}