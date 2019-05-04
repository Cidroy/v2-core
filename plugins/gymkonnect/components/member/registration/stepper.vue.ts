import appConfig from "@/app.config"
import Layout from "@plugins/core/layouts/layout.vue"
import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator"
import { GymkonnectStore } from "@plugins/gymkonnect/state/gymkonnect"
import { TMRegistration, defaultRegistrationUser } from "@plugins/gymkonnect/classes/types/registration"

import stepOne from "@plugins/gymkonnect/components/member/registration/step-1.vue"
import stepTwo from "@plugins/gymkonnect/components/member/registration/step-2.vue"
import stepFinished from "@plugins/gymkonnect/components/member/registration/step-finished.vue"

import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import { alert } from "@/components/toast"

// @ts-ignore
@Component({
	components: { Layout, stepOne, stepTwo, stepFinished, },
})
export default class MemberRegistrationStepper extends Vue.default {
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
			let id = await Gymkonnect.MemberRegistration.addMember(this.userDataComputed)
			this.userData.id = id
			this.inputEmitter()
			this.finishedEmitter(id)
			this.finished = true
		} catch (error) {
			this.error = error.toString()
			alert(error.toString(), "error")
		}
		this.saving = false
	}

	private get GROUPINGS() { return GymkonnectStore.GK_GROUPINGS }

	@Prop({ type: Boolean, default: false }) public showDelete !: boolean
	@Emit("deleteStepper") public deleteStepper() { return true }
	@Prop({ type: Array, default: () => ([]) }) public exclude !: string[]
}
