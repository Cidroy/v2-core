import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator"
import { MiscStore } from "@plugins/gymkonnect/state/misc"
import { TMRegistration, defaultRegistrationUser } from "@plugins/gymkonnect/classes/types/registration"

import stepOne from "@plugins/gymkonnect/components/member/registration/step-1.vue"
import stepTwo from "@plugins/gymkonnect/components/member/registration/step-2.vue"
import stepFinished from "@plugins/gymkonnect/components/member/registration/step-finished.vue"

import Gymkonnect from "@plugins/gymkonnect/classes/clients"

@Component({
	// @ts-ignore
	components: { Layout, stepOne, stepTwo, stepFinished, },
})
// @ts-ignore
export default class MemberRegistrationStepper extends Vue {
	private userData: TMRegistration = defaultRegistrationUser
	private get userDataComputed() {
		return {
			...this.value,
			...this.userData,
		}
	}
	@Prop({ type: Object, default: () => defaultRegistrationUser, }) private value !: TMRegistration
	@Emit("input") public inputEmitter() { return this.userDataComputed }
	@Watch("value") private onValueChange() {
		this.userData = { ...this.userData, ...this.value }
	}
	@Watch("userData") private onUserDataChange(newVal) { this.inputEmitter() }

	private step = 0
	private grouping = Object.keys(this.GROUPINGS)[0]
	private saving = false
	private error = ""

	private step2() { this.step = 2 }
	private step3() { this.step = 3 }
	private step4() { this.step = 4 }

	@Emit("finished") public finishedEmitter(memberId) { return memberId }
	private finished = false
	private async finish() {
		this.saving = true
		try {
			let id = await Gymkonnect.Registration.addMember(this.userDataComputed)
			this.userData.id = id
			this.inputEmitter()
			this.finishedEmitter(id)
			this.finished = true
		} catch (error) {
			this.error = error.toString()
		}
		this.saving = false
	}

	private get GROUPINGS() { return MiscStore.GROUPINGS }

	@Prop({ type: Boolean, default: false }) private showDelete !: boolean
	@Emit("deleteStepper") public deleteStepper() { return true }
}