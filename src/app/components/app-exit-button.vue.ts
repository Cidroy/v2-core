import { Component, Vue } from "vue-property-decorator"
import { ipcRenderer, remote } from "electron"
import empty from "@/components/empty.vue"

@Component({
	// @ts-ignore
	components: { empty, },
	mounted() {
		ipcRenderer.on("app-require-quit-confirm", (state: boolean) => { this.requireConfirmExit = state })
	},

})
// @ts-ignore
export default class InstallExitButton extends Vue {
	private requireConfirmExit: boolean = true
	private confirmExit: boolean = false

	private exitInstallation() {
		let thisWindow = remote.getCurrentWindow()
		thisWindow.close()
	}
}
