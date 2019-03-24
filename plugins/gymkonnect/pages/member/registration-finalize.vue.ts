import { Component, Vue, Prop, Watch } from "vue-property-decorator"
import Layout from "@/layouts/layout.vue"
import { alert } from "@/components/toast"
import router from "@/routes"
import { TMRegistration, TMRegistrationHealth, defaultRegistrationUserHealth } from "@plugins/gymkonnect/classes/types/registration"
import MRegistrationStepFinished from "@plugins/gymkonnect/components/member/registration/step-finished.vue"
import { GymkonnectStore } from "@plugins/gymkonnect/state/misc"
import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import { Routes } from "@plugins/gymkonnect/routes"
import { Permissions as gymkonnect } from "@plugins/gymkonnect/permission"
import { formatDate } from "@/utils/misc"
import moment from "moment"

type TTransactions = Unpacked<ReturnType<typeof Gymkonnect.MemberRegistration.makePayments>>["transactions"]
type TGroup = Unpacked<ReturnType<typeof Gymkonnect.MemberRegistration.makePayments>>["group"]
type TUser = TMRegistration & TMRegistrationHealth & { healthInitial: string | number }
const TUserGenerator = (user: TMRegistration, previous: TUser | {} = {}): TUser => ({
	healthInitial: 0,
	...defaultRegistrationUserHealth,
	...previous,
	...user,
})
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
	created(){
		this.onUsersChange()
		this.onTransactionChange()
		this.onGroupChange()
	}
})
// @ts-ignore
export default class RegistrationFinalizePage extends Vue {
	private get moment(){ return moment }
	private get formatDate(){ return formatDate }

	private get PERMISSIONS(){ return { gymkonnect } }

	private get BLOOD_GROUPS() { return GymkonnectStore.GK_BLOOD_GROUPS }
	private get BODY_TYPES() { return GymkonnectStore.GK_BODY_TYPES }

	@Prop({ type: Object, default: () => ({}) }) public users !: Record<string, TMRegistration>
	@Prop({ type: Array, default: () => ([]) }) public transactions !: TTransactions
	@Prop({ type: Object, default: () => ({}) }) public group !: TGroup
	@Watch("users")
	private onUsersChange(){
		for (const key in this.users)
			if (this.users.hasOwnProperty(key))
				this.Users[key] = TUserGenerator(
					this.users[key],
					this.Users.hasOwnProperty(key)?this.Users[key]:{}
				)
		for (const key in this.Users)
			if (this.Users.hasOwnProperty(key) && !this.users.hasOwnProperty(key)) delete this.Users[key]
	}
	@Watch("transactions")
	private onTransactionChange(){ }
	@Watch("group")
	private onGroupChange(){ this.Group = this.group }

	private Group : TGroup = null
	private groupRenaming = false
	private async renameGroup(){
		this.groupRenaming = true
		try {
			if(this.Group===null) throw "No Group to rename"
			await Gymkonnect.MemberGroups.rename(this.Group.id, this.Group.name)
		} catch (error) { alert(error.toString(), "error") }
		this.groupRenaming = false
	}

	private Users: Record<string, TUser> = {}
	private get usersCount() { return (this.Users && 0) || Object.values(this.Users).length }
	private getIndex(indexStr: string) { return Object.keys(this.Users).indexOf(indexStr) + 1 }

	private healthRegisteredUsers: (string | number)[] = []
	private healthDataSaving: string | number | false = false
	private async healthDataSave(id: string | number) {
		this.healthDataSaving = id
		try {
			let key = Object.keys(this.Users).find(k => this.Users[k].id === id)
			if (!key) throw "Invalid User"
			this.Users[key].healthInitial = await Gymkonnect.Health.addInitialHealth(
				id,
				this.Users[key].height,
				this.Users[key].weight,
				this.Users[key].bodyType,
				this.Users[key].bloodGroup
			)
			this.healthRegisteredUsers.push(id)
			alert("Saved Initial Health Status", "success")
		} catch (error) { alert(error.toString(), "error") }
		this.healthDataSaving = false
	}

	private usersEnrolled: (string | number)[] = []
	private userEnrollingFP: string | number | false = false
	private async userEnrollFP(id: string | number) {
		this.userEnrollingFP = id
		try {
			let key = Object.keys(this.Users).find(k => this.Users[k].id === id)
			if (!key) throw "Invalid User"
			await Gymkonnect.MemberRegistration.scanFingerprint(id)
			this.usersEnrolled.push(id)
		} catch (error) { alert(error.toString(), "error") }
		this.userEnrollingFP = false
	}

	private goBackSimon(){ router.push({ name: Routes.MEMBER_REGISTRATION.name }) }
}