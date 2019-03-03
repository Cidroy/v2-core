import { Component, Vue } from "vue-property-decorator"
import empty from "@/components/empty.vue"
import { DeviceStore } from "@plugins/gymkonnect/state/device"

@Component({
	// @ts-ignore
	components: { empty, },
})
// @ts-ignore
export default class DeviceStatusButton extends Vue {
	private get iconColor(){
		let color = "red"
		if(this.allDevice===0) color = "grey"
		else if(this.activeDevice===this.allDevice) color = "green"
		return color
	}

	private get activeDevice(){ return DeviceStore.GK_FP_DEVICES_ACTIVE }
	private get allDevice(){ return DeviceStore.GK_FP_DEVICES_TOTAL }

	private showDevicesMenu = false
	private get loading(){ return DeviceStore.GK_FP_SYNCING_STATUS }
	private get devices(){ return DeviceStore.GK_FP_DEVICES }
}