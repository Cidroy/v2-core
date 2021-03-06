import { Component, Watch, Vue } from "vue-property-decorator"
import { InstallerStore } from "@/state/install-modules/install"
import { MAIN } from "@plugins/core/classes/setup"
import { TStageProductKey } from "@plugins/core/classes/install-router"

@Component({
	// @ts-ignore
	components: {},
	page: {
		title: "Install Gym-Konnect",
		meta: [{ name: "Install", content: "Install Gymkonnect now", },],
	},
})
export default class ProductLoginPage extends Vue.default {
	private username = ""
	private password = ""
	private key = ""
	private showPassword = false
	private loading = false
	private error = ""
	private valid = false
	private rules = {
		username: [(v: string) => !!v || "Username is required",],
		password: [(v: string) => !!v || "Password is required",],
		key: [(v: string) => true,],
	}

	private get showErrorDialog() { return !!this.error }

	private async next() {
		// @ts-ignore
		this.$refs["loginForm"].validate()
		if (!this.valid) return false

		this.loading = true
		try {
			await MAIN.next({
				username: this.username,
				password: this.password,
				key: this.key,
			})
		}
		catch (e) { this.error = e }
		this.loading = false
		return true
	}

	constructor() {
		super()
		InstallerStore.setInstallPageTitle("install.steps.login")
	}
}
