import { BIOMETRIC_DEVICE_CHECK_TYPE } from "@neutron/lib/IBiometric"

export type WDMSConnectionConfig = {
	ssl: boolean
	host: string
	port: number
	DeviceName: string,
	id: string,
	zoneName: string,
	checkType: BIOMETRIC_DEVICE_CHECK_TYPE,
	serial: string,
	ip: string,
	deptID: string,
}
