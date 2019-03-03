import { VuexModule, Module, getModule, MutationAction, Action } from "vuex-module-decorators"
import store from "@/state/store"
import { TBiometricDetails } from "@classes/types/biometric"
import { DEVICE_STATE } from "@classes/enum/biometric"
import { sleep } from "@classes/misc"

let gkFPDevices: TBiometricDetails[] = []
let gkFPSyncingStatus = false

@Module({ dynamic: true, store, name: "Device" })
class Device extends VuexModule {
	private gkFPDevices = gkFPDevices
	public get GK_FP_DEVICES() { return this.gkFPDevices }

	public get GK_FP_DEVICES_TOTAL() { return this.gkFPDevices.length }
	public get GK_FP_DEVICES_ACTIVE() { return this.gkFPDevices.filter(device => device.state===DEVICE_STATE.ONLINE).length }

	private gkFPSyncingStatus = gkFPSyncingStatus
	public get GK_FP_SYNCING_STATUS() { return this.gkFPSyncingStatus }
	@MutationAction({ mutate: [ "gkFPSyncingStatus", ] }) public async gkFPSyncing(status: boolean) {
		gkFPSyncingStatus = status
		return { gkFPSyncingStatus }
	}
	@MutationAction({ mutate: [ "gkFPDevices", ] }) public async gkFPSetList(payload: TBiometricDetails[]) {
		gkFPDevices = payload
		return { gkFPDevices, }
	}

	@Action({ }) public async gkFPSync() {
		this.gkFPSyncing(true)
		await sleep(2000)
		// TODO: sync baby sync!
		gkFPDevices = [
			{
				serial: "123123123",
				ip: "192.123.123.124",
				state: DEVICE_STATE.OFFLINE,
				name: "Spa Entry",
				zoneId: 1,
				zoneName: "spa"
			},
			{
				serial: "123123123",
				ip: "192.123.123.123",
				state: DEVICE_STATE.ONLINE,
				name: "Gym Entry",
				zoneId: 1,
				zoneName: "spa"
			},
		]
		this.gkFPSetList(gkFPDevices)
		this.gkFPSyncing(false)
		return true
	}
}

export const DeviceStore = getModule(Device)