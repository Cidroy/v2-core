import { Component, Vue } from "vue-property-decorator"
import empty from "@/components/empty.vue"
import { sleep } from "@classes/misc"
import { Toast } from "@/components/toast"

@Component({
	// @ts-ignore
	components: { empty, },
})
// @ts-ignore
export default class BackupButton extends Vue {
	private backingUp = false

	private async backup(){
		this.backingUp = true
		try {
			// TODO: backup
			await sleep(1000)
			throw "Backup is not implemented"
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