import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator"
import appConfig from "@/app.config"
import Layout from "@/layouts/layout.vue"
import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import { Logger } from "@classes/CONSOLE"
import { PaymentDetail } from "@plugins/gymkonnect/classes/types/payment"
import MRegistrationStepFinished from "@plugins/gymkonnect/components/member/registration/step-finished.vue"
import MRegistrationStep3 from "@plugins/gymkonnect/components/member/registration/step-3.vue"
import SinglePaymentModal from "@plugins/gymkonnect/components/payment/modal-single.vue"
import { alert } from "@/components/toast"
import { defaultRegistrationStep3User } from "@plugins/gymkonnect/classes/types/registration"
import { GymkonnectStore } from "@plugins/gymkonnect/state/gymkonnect"
import { formatDate } from "@/utils/misc"
import moment from "moment"
import router from "@/routes"
import { routes } from "@plugins/gymkonnect/routes"

const Console = new Logger(`renewal.vue/gk`)
@Component({
	// @ts-ignore
	components: {
		Layout,
		MRegistrationStepFinished,
		MRegistrationStep3,
		SinglePaymentModal,
	},
	page: {
		title: "Membership Renewal",
		meta: [{ name: "Renew Membership Plans", content: appConfig.description, },],
	},
	created(){
		this.Initialize()
	}
})
export default class MembershipRenewalPage extends Vue.default {
	private formatDate(date: string) { return formatDate(date) }
	private error = ""
	private async Initialize(){
		this.clientData = await Gymkonnect.Renewal.defaultInfo()
		this.clientId = this.value
	}

	private readonly label = "Search by Mobile Number or Badge Number"
	@Prop({ type: [ String, Number, ], default: "" }) public value !: string | number
	@Watch("value") private onValueChange(){ this.clientId = this.value }
	@Emit("input") public inputEmitter(){ return this.clientId }
	private clientId: string | number = ""
	@Watch("clientId") private async onClientIdChange(){
		if(!this.clientId) return
		this.clientDataLoading = true
		try {
			this.clientData = await Gymkonnect.Renewal.info(this.clientId)
		} catch (error) {
			Console.error(error)
			await alert(error.toString(), "error")
		}
		this.clientDataLoading = false
		this.inputEmitter()
	}
	private get clientName(){
		if(this.value) return ""
		let client = this.Clients.find(client => client.id === this.clientId)
		return client? client.name : "Invalid"
	}
	private clientDataLoading = false
	private clientSearch = ""
	private clientSearching = false
	@Watch("clientSearch") private async onClientSearch(){
		if (this.clientSearch && this.clientSearch.length >=3 && this.clientSearch.length%3===0){
			this.clientSearching = true
			this.clients = await Gymkonnect.Members.find(this.clientSearch, [ "badgenumber", "mobile", "firstName", "middleName", "lastName", ])
			this.clientSearching = false
		}
	}
	private clients: Unpacked<ReturnType<typeof Gymkonnect.Members.find>> = []
	private get Clients(){
		return this.clients.filter(client => client.name.toLowerCase().includes(this.clientSearch?this.clientSearch.toLowerCase():"")
			|| client.badgenumber!.includes(this.clientSearch)
			|| client.mobile!.includes(this.clientSearch)
		)
	}
	private get Current(){
		return {
			Membership: GymkonnectStore.GK_MEMBERSHIP_TYPE(this.clientData.transaction.membershipType),
			Package: GymkonnectStore.GK_PACKAGE(this.clientData.transaction.packageType),
			StartDate: this.clientData.transaction.start,
			EndDate: this.clientData.transaction.end,
		}
	}

	// @ts-ignore
	private clientData: Unpacked<ReturnType<typeof Gymkonnect.Renewal.defaultInfo>> = 0
	@Watch("clientData") private onClientDataChange(){
		this.transactionData = this.clientData.transaction
	}
	private transactionData: Unpacked<ReturnType<typeof Gymkonnect.Renewal.defaultInfo>>["transaction"] = {
		...defaultRegistrationStep3User,
		start: moment().toISOString().substr(0,10),
		end: moment().toISOString().substr(0,10),
		id: 0,
	}
	private get grouping(){ return this.clientData.grouping }
	private get GroupName(){
		let grouping = GymkonnectStore.GK_GROUPING(this.grouping)
		return grouping? grouping.name: "None"
	}
	private get Group(){ return this.clientData.group }
	private get usersCount(){ return this.clientData.usersCount }
	private get Client(){ return { ...this.clientData.client, ...this.clientData.transaction } }
	private get dojRange(){ return this.clientData.dojRange }

	private paying = false
	private paymentModel = false
	private paymentId: string | number = 0
	private get payed(){ return !!(this.paymentId && this.transactionId) }
	private transactionId: string | number = 0
	private async pay(paymentData?: PaymentDetail) {
		this.paying = true
		try {
			let result = await Gymkonnect.Renewal.renew(
				this.clientId,
				this.transactionData,
				paymentData,
			)
			this.paymentId = result.paymentId
			this.transactionId = result.transactionId
			router.push({
				name: routes.REPORTS.name,
				params: <any>{
					ReportType: "RENEWAL",
					TimePeriod: "CUSTOM",
					TimeRange: {
						start: moment(this.transactionData.start).toISOString().substr(0, 10),
						end: moment(this.transactionData.end).toISOString().substr(0, 10),
					},
					Focus: result.transactionId,
				},
			})
		} catch (error) { alert(error.toString(), "error") }
		this.paying = false
	}

	private goBackSimon() { this.clientId = "" }
	private print(){
		// TODO:
	}
}
