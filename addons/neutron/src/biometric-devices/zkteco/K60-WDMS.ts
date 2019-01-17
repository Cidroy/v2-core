import ZKTEco_K40_WDMS from "./K40-WDMS"
import { SupportedBiometricDevice } from "@classes/enum/supported-biometric-devices"
import { WDMSConnectionConfig } from "./misc"
import { Logger } from "@classes/CONSOLE"
import IBiometric from "@neutron/lib/IBiometric"

/**
 * Login to ZKTEco K60 devices in wdms mode
 *
 * @export
 * @class ZKTEco_K60_WDMS
 * @extends {ZKTEco_K40_WDMS}
 * @implements {IBiometric}
 */
export default class ZKTEco_K60_WDMS extends ZKTEco_K40_WDMS implements IBiometric{
	public get DeviceType() { return SupportedBiometricDevice.ZKTECO_K60_WDMS }

	constructor(wdms: WDMSConnectionConfig){
		super(wdms)
		this.log = new Logger(`${this.DeviceName}@zkteco-k60-wdms`)
	}
}