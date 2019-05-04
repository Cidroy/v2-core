import { WDMSConnectionConfig } from "@neutron/biometric-devices/zkteco/misc"
import ZKTEco_K40_WDMS from "@neutron/biometric-devices/zkteco/K40-WDMS"
import ZKTEco_K60_WDMS from "@neutron/biometric-devices/zkteco/K60-WDMS"

export type ZKTEco_K40_WDMSOptions = WDMSConnectionConfig
export type ZKTEco_K60_WDMSOptions = ZKTEco_K40_WDMSOptions

export type BiometricDeviceOptions = ZKTEco_K40_WDMSOptions | ZKTEco_K60_WDMSOptions

export type TBiometricDevices = typeof ZKTEco_K40_WDMS
							 | typeof ZKTEco_K60_WDMS

export type TBiometricDevice = ZKTEco_K40_WDMS
							 | ZKTEco_K60_WDMS

export enum SupportedBiometricDevice {
	ZKTECO_K40_WDMS = "ZKTECO-K40-WDMS",
	ZKTECO_K60_WDMS = "ZKTECO-K60-WDMS",
}

export const InstanceList: {
	[K in SupportedBiometricDevice]: TBiometricDevices
} = {
	[SupportedBiometricDevice.ZKTECO_K40_WDMS]: ZKTEco_K40_WDMS,
	[SupportedBiometricDevice.ZKTECO_K60_WDMS]: ZKTEco_K60_WDMS,
}
