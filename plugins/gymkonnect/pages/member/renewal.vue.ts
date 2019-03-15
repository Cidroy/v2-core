import { Component, Vue, Watch } from "vue-property-decorator"
import appConfig from "@/app.config"
import Layout from "@/layouts/layout.vue"
import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import { Logger } from "@classes/CONSOLE"
import { PaymentDetail } from "@plugins/gymkonnect/classes/types/payment"
import MRegistrationStepFinished from "@plugins/gymkonnect/components/member/registration/step-finished.vue"
import MRegistrationStep3 from "@plugins/gymkonnect/components/member/registration/step-3.vue"
import SinglePaymentModal from "@plugins/gymkonnect/components/payment/modal-single.vue"
import router from "@/routes"

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
// @ts-ignore
export default class MembershipRenewalPage extends Vue {
	private async Initialize(){
		this.clientData = await Gymkonnect.Renewal.defaultInfo()
	}

	private readonly label = "Search by Mobile Number or Badge Number"
	private clientId: string | number = ""
	@Watch("clientId") private async onClientIdChange(){
		this.clientDataLoading = true
		this.clientData = await Gymkonnect.Renewal.info(this.clientId)
		this.clientDataLoading = false
	}
	private get clientName(){
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
		return this.clients.filter(client => client.name.toLowerCase().includes(this.clientSearch.toLowerCase())
			|| client.badgenumber!.includes(this.clientSearch)
			|| client.mobile!.includes(this.clientSearch)
		)
	}

	// @ts-ignore
	private clientData: Unpacked<ReturnType<typeof Gymkonnect.Renewal.defaultInfo>> = 0
	@Watch("clientData") private onClientDataChange(){ this.transactionData = this.clientData.transaction }
	private transactionData: Unpacked<ReturnType<typeof Gymkonnect.Renewal.defaultInfo>>["transaction"] = this.clientData.transaction
	private get grouping(){ return this.clientData.grouping }
	private get usersCount(){ return this.clientData.usersCount }
	private get Client(){ return this.clientData.client }
	private get dojRange(){ return this.clientData.dojRange }

	private paying = false
	private paymentModel = false
	private payed = false
	private async pay(paymentData: PaymentDetail) {
		this.paying = true
		this.paying = false
		this.payed = true
	}

	private goBackSimon() { this.clientId = "" }
}