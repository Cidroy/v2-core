import { Component, Vue } from "vue-property-decorator"
import Layout from "@/layouts/layout.vue"
import { alert } from "@/components/toast"
import router from "@/routes"
import { TMRegistration, TMRegistrationHealth, defaultRegistrationUserHealth, defaultRegistrationUser } from "@plugins/gymkonnect/classes/types/registration"
import MRegistrationStepFinished from "@plugins/gymkonnect/components/member/registration/step-finished.vue"
import { GymkonnectStore } from "@plugins/gymkonnect/state/misc"
import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import { Routes } from "@plugins/gymkonnect/routes"

type TUser = TMRegistration & TMRegistrationHealth & { healthInitial: string | number }
const defaultUser = { ...defaultRegistrationUser, ...defaultRegistrationUserHealth, healthInitial: 0 }
@Component({
	// @ts-ignore
	components: {
		MRegistrationStepFinished,
		Layout,
	},
	page: {
		title: "Registration Complete",
		meta: [{ name: "Finalize Registration and more", content: "", },],
	},
})
// @ts-ignore
export default class RegistrationFinalizePage extends Vue {
	private get BLOOD_GROUPS() { return GymkonnectStore.GK_BLOOD_GROUPS }
	private get BODY_TYPES() { return GymkonnectStore.GK_BODY_TYPES }

	private users: { [index: string]: TUser } = {
		a: defaultUser,
		// b: defaultUser,
	}
	private get usersCount() { return (this.users && 0) || Object.values(this.users).length }
	private getIndex(indexStr: string) { return Object.keys(this.users).indexOf(indexStr) + 1 }

	private healthRegisteredUsers: (string | number)[] = []
	private healthDataSaving: string | number | false = false
	private async healthDataSave(id: string | number) {
		this.healthDataSaving = id
		try {
			let key = Object.keys(this.users).find(k => this.users[k].id === id)
			if (!key) throw "Invalid User"
			this.users[key].healthInitial = await Gymkonnect.Health.addInitialHealth(
				id,
				this.users[key].height,
				this.users[key].weight,
				this.users[key].bodyType,
				this.users[key].bloodGroup
			)
			this.healthRegisteredUsers.push(id)
		} catch (error) { alert(error.toString(), "error") }
		this.healthDataSaving = false
	}

	private usersEnrolled: (string | number)[] = []
	private userEnrollingFP: string | number | false = false
	private async userEnrollFP(id: string | number) {
		this.userEnrollingFP = id
		try {
			let key = Object.keys(this.users).find(k => this.users[k].id === id)
			if (!key) throw "Invalid User"
			await Gymkonnect.Registration.scanFingerprint(id)
			this.usersEnrolled.push(id)
		} catch (error) { alert(error.toString(), "error") }
		this.userEnrollingFP = false
	}

	private goBackSimon(){ router.push({ name: Routes.MEMBER_REGISTRATION.name }) }
}