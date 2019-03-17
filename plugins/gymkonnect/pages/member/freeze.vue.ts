import { Component, Vue, Watch } from "vue-property-decorator"
import moment from "moment"
import appConfig from "@/app.config"
import Layout from "@/layouts/layout.vue"
import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import { Logger } from "@classes/CONSOLE"
import { PaymentDetail } from "@plugins/gymkonnect/classes/types/payment"
import MRegistrationStepFinished from "@plugins/gymkonnect/components/member/registration/step-finished.vue"
import SinglePaymentModal from "@plugins/gymkonnect/components/payment/modal-single.vue"

const Console = new Logger(`freeze.vue/gk`)
@Component({
	// @ts-ignore
	components: {
		Layout,
		MRegistrationStepFinished,
		SinglePaymentModal,
	},
	page: {
		title: "Membership Freezing",
		meta: [{ name: "Freeze Membership Plans", content: appConfig.description, },],
	},
	created() {
		this.Initialize()
	}
})
// @ts-ignore
export default class MembershipFreezingPage extends Vue {
	private async Initialize() {
		this.clientData = await Gymkonnect.Renewal.defaultInfo()
	}

	private readonly label = "Search by Mobile Number or Badge Number"
	private clientId: string | number = ""
	@Watch("clientId") private async onClientIdChange() {
		this.clientDataLoading = true
		this.clientData = await Gymkonnect.Renewal.info(this.clientId)
		this.clientDataLoading = false
	}
	private get clientName() {
		let client = this.Clients.find(client => client.id === this.clientId)
		return client ? client.name : "Invalid"
	}
	private clientDataLoading = false
	private clientSearch = ""
	private clientSearching = false
	@Watch("clientSearch") private async onClientSearch() {
		if (this.clientSearch && this.clientSearch.length >= 3 && this.clientSearch.length % 3 === 0) {
			this.clientSearching = true
			this.clients = await Gymkonnect.Members.find(this.clientSearch, ["badgenumber", "mobile", "firstName", "middleName", "lastName",])
			this.clientSearching = false
		}
	}
	private clients: Unpacked<ReturnType<typeof Gymkonnect.Members.find>> = []
	private get Clients() {
		return this.clients.filter(client => client.name.toLowerCase().includes(this.clientSearch.toLowerCase())
			|| client.badgenumber!.includes(this.clientSearch)
			|| client.mobile!.includes(this.clientSearch)
		)
	}

	// @ts-ignore
	private clientData: Unpacked<ReturnType<typeof Gymkonnect.Renewal.defaultInfo>> = 0
	@Watch("clientData") private onClientDataChange() { this.transactionData = this.clientData.transaction }
	private transactionData: Unpacked<ReturnType<typeof Gymkonnect.Renewal.defaultInfo>>["transaction"] = this.clientData.transaction
	private get grouping() { return this.clientData.grouping }
	private get usersCount() { return this.clientData.usersCount }
	private get Client() { return this.clientData.client }
	private get dojRange() { return this.clientData.dojRange }

	private paying = false
	private paymentModel = false
	private payed = false
	private async pay(paymentData: PaymentDetail) {
		this.paying = true
		this.paying = false
		this.payed = true
	}

	private goBackSimon() { this.clientId = "" }

	private freeze1 = false
	private freeze2 = false
	private minPeriod = 5
	private startDate = new Date().toISOString().substr(0, 10)
	private minStartDate = new Date().toISOString().substr(0, 10)
	private startDateFormatted = this.formatDate(this.startDate)
	private endDate = new Date().toISOString().substr(0, 10)
	private endDateFormatted = this.formatDate(this.endDate)
	private snackbar = false
	private y = "top"
	private x = "right"
	private mode = ""
	private timeout = 6000
	private freezingPeriod = []

	private get period() {
		let a = moment(this.endDate)
		let b = moment(this.startDate)
		return a.diff(b, "days")
	}

	private get minEndDate() {
		return moment(this.startDate).add(this.minPeriod + 1, "days").toISOString().substr(0, 10)
	}

	@Watch("minEndDate")
	private onMinEndDateChanged(newVal, oldVal) {
		this.endDate = moment.max(moment(this.endDate), moment(newVal)).add(1, "days").toISOString().substr(0, 10)
	}

	@Watch("minStartDate")
	private onMinStartDateChanged(newVal, oldVal) {
		this.startDate = moment.max(moment(this.startDate), moment(newVal)).add(1, "days").toISOString().substr(0, 10)
	}

	@Watch("startDate")
	private onStartDateChanged() {
		this.startDateFormatted = this.formatDate(this.startDate)
	}

	@Watch("endDate")
	private onEndDateChanged() {
		this.endDateFormatted = this.formatDate(this.endDate)
	}

	private get getStartDateFormatted() {
		return this.formatDate(this.startDate)
	}
	private get getEndDateFormatted() {
		return this.formatDate(this.endDate)
	}

	// FIXME: use from utils!
	private formatDate(date) {
		// if (!date) return null
		const [year, month, day,] = date.split("-")
		return `${day}/${month}/${year}`
	}
	private parseDate(date) {
		if (!date) return null
		const [day, month, year,] = date.split("/")
		return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
	}

}
