import { VuexModule, Module, getModule, MutationAction, Action } from "vuex-module-decorators"
import store from "@/state/store"
import { TBiometricDetails } from "@classes/types/biometric"
import { DEVICE_STATE } from "@classes/enum/biometric"
import PositronClient from "@/utils/positron"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`device/gk-store`)
let gkFPDevices: TBiometricDetails[] = []
let gkFPSyncingStatus = false
let gkFPDeviceSyncError = ""

@Module({ dynamic: true, store, name: "Device" })
class Device extends VuexModule {
	private gkFPDevices = gkFPDevices
	public get GK_FP_DEVICES() { return this.gkFPDevices }

	private gkFPDeviceSyncError = gkFPDeviceSyncError
	public get GK_FP_DEVICE_SYNC_ERROR() { return this.gkFPDeviceSyncError }
	@MutationAction({ mutate: ["gkFPDeviceSyncError",] }) public async mutateGKFPDeviceSyncError(status: string) {
		gkFPDeviceSyncError = status
		return { gkFPDeviceSyncError }
	}

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
		Console.verbose("syncing FP device status")
		this.gkFPSyncing(true)
		this.mutateGKFPDeviceSyncError("")
		try {
			let result = <
				{ type: "success", devices: Record<string, TBiometricDetails> }
				| { type: "error", message: string }
			>(await PositronClient.POST("/biometric-devices/status/all"))
			if(result.type==="success"){
				let devices = result.devices
				gkFPDevices = Object.keys(devices).map(name => ({
					...devices[name],
					name,
				}))
				this.gkFPSetList(gkFPDevices)
			}
			else if(result.type==="error") throw result.message
		} catch (error) {
			Console.error(error)
			error = error.toString()
			if (error.includes("RequestError")) error = "Unable to Connect to Positron"
			this.mutateGKFPDeviceSyncError(error.toString())
		}
		this.gkFPSyncing(false)
		return true
	}
}

export const DeviceStore = getModule(Device)
