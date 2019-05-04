import { Component, Vue } from "vue-property-decorator"
import empty from "@/components/empty.vue"
import { DeviceStore } from "@plugins/gymkonnect/state/device"

@Component({
	// @ts-ignore
	components: { empty, },
	created(){
		this.Initialize()
	}
})
export default class DeviceStatusButton extends Vue.default {
	private get iconColor(){
		let color = "red"
		if(this.error){}
		else if(this.allDevice===0) color = "grey"
		else if(this.activeDevice===this.allDevice) color = "green"
		return color
	}

	private get error(){ return DeviceStore.GK_FP_DEVICE_SYNC_ERROR }

	private syncDeviceStatus(){
		try { DeviceStore.gkFPSync() } catch (error) { }
		setTimeout(() => { this.syncDeviceStatus() }, 60 * 1000)
	}

	private Initialize(){
		this.syncDeviceStatus()
	}

	private get activeDevice(){ return DeviceStore.GK_FP_DEVICES_ACTIVE }
	private get allDevice(){ return DeviceStore.GK_FP_DEVICES_TOTAL }

	private showDevicesMenu = false
	private get loading(){ return DeviceStore.GK_FP_SYNCING_STATUS }
	private get devices(){ return DeviceStore.GK_FP_DEVICES }
}
