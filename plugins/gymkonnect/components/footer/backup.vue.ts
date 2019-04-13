import { Component, Vue } from "vue-property-decorator"
import empty from "@/components/empty.vue"
import { sleep } from "@classes/misc"
import { Toast } from "@/components/toast"

@Component({
	// @ts-ignore
	components: { empty, },
})
export default class BackupButton extends Vue.default {
	private backingUp = false

	private async backup(){
		this.backingUp = true
		try {
			// TODO: backup
			throw "Cloud Backup is disabled"
		} catch (error) {
			Toast.fire({
				type: "error",
				title: error.toString(),
				position: "bottom-end",
			})
		}
		this.backingUp = false
	}
}