import { Component, Vue } from "vue-property-decorator"
import empty from "@/components/empty.vue"
// #!if electron
import { ipcRenderer, remote } from "electron"
// #!endif

@Component({
	// @ts-ignore
	components: { empty, },
	mounted() {
		// #!if electron
		ipcRenderer.on("app-require-quit-confirm", (state: boolean) => { this.requireConfirmExit = state })
		// #!endif
	},

})
export default class InstallExitButton extends Vue.default {
	private requireConfirmExit: boolean = true
	private confirmExit: boolean = false

	private exitInstallation() {
		// #!if electron
		let thisWindow = remote.getCurrentWindow()
		thisWindow.close()
		// #!else
		// TODO: browser close tab
		alert("Exit")
		// #!endif
	}
}
