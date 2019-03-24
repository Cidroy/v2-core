import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator"
import appConfig from "@/app.config"
import Layout from "@/layouts/layout.vue"
import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import { Logger } from "@classes/CONSOLE"
import { PaymentDetail } from "@plugins/gymkonnect/classes/types/payment"
import MRegistrationStepFinished from "@plugins/gymkonnect/components/member/registration/step-finished.vue"
import { alert } from "@/components/toast"
import { GymkonnectStore } from "@plugins/gymkonnect/state/misc"
import { formatDate, parseDate } from "@/utils/misc"
import moment, { Moment } from "moment"
import FreezePaymentModal from "@plugins/gymkonnect/components/payment/modal-freeze.vue"
import { TFreezeTransaction } from "@plugins/gymkonnect/classes/types/freeze"

const Console = new Logger(`freeze.vue/gk`)
@Component({
	// @ts-ignore
	components: {
		Layout,
		MRegistrationStepFinished,
		FreezePaymentModal,
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
	private get formatDate() { return formatDate }
	private get parseDate() { return parseDate }
	private error = ""
	private async Initialize() {
		this.clientData = await Gymkonnect.Renewal.defaultInfo()
		this.clientId = this.value
	}

	private readonly label = "Search by Mobile Number or Badge Number"
	@Prop({ type: [String, Number,], default: "" }) public value !: string | number
	@Watch("value") private onValueChange() { this.clientId = this.value }
	@Emit("input") public inputEmitter() { return this.clientId }
	private clientId: string | number = ""
	@Watch("clientId") private async onClientIdChange() {
		if (!this.clientId) return
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
	private get clientName() {
		if (this.value) return ""
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
		return this.clients.filter(client => client.name.toLowerCase().includes(this.clientSearch ? this.clientSearch.toLowerCase() : "")
			|| client.badgenumber!.includes(this.clientSearch)
			|| client.mobile!.includes(this.clientSearch)
		)
	}
	private get Current() {
		return {
			Membership: GymkonnectStore.GK_MEMBERSHIP_TYPE(this.clientData.transaction.membershipType),
			Package: GymkonnectStore.GK_PACKAGE(this.clientData.transaction.packageType),
			StartDate: this.clientData.transaction.start,
			EndDate: this.clientData.transaction.end,
		}
	}

	// @ts-ignore
	private clientData: Unpacked<ReturnType<typeof Gymkonnect.Renewal.defaultInfo>> = 0
	@Watch("clientData") private onClientDataChange() {
		this.XfreezeStartMin = this.clientData.transaction.start
		this.XfreezeEndMax = this.clientData.transaction.end
	}
	private get grouping() { return this.clientData.grouping }
	private get GroupName() {
		let grouping = GymkonnectStore.GK_GROUPING(this.grouping)
		return grouping ? grouping.name : "None"
	}
	private get Group() { return this.clientData.group }
	private get usersCount() { return this.clientData.usersCount }
	private get Client() { return { ...this.clientData.client, ...this.clientData.transaction } }

	private get TransactionId(){ return this.clientData.transaction.id }

	private paying = false
	private paymentModel = false
	private paymentId: string | number = 0
	private get payed() { return !!(this.paymentId && this.transactionId) }
	private transactionId: string | number = 0

	private async pay(paymentData: PaymentDetail) {
		this.paying = true
		try {
			throw "Not implemented"
		} catch (error) { alert(error.toString(), "error") }
		this.paying = false
	}

	private goBackSimon() { this.clientId = "" }
	private print() {
		// TODO:
	}

	private get MinimumPeriod() { return this.noMinimumPeriod ? 1 : 5 }
	private get MaximumPeriod() {
		let diff = moment(this.freezeEndMax).diff(this.freezeStart, "days") + 1
		return this.ignoreRemainingRestrictions ? diff : this.RemainingFreezeDays
	}
	private noMinimumPeriod = false
	@Watch("noMinimumPeriod") private onNoMinimumPeriodChange(){
		this.freezingPeriod = Math.max(this.freezingPeriod, this.MinimumPeriod)
	}
	private get RemainingFreezeCount() { return 1 }
	private get RemainingFreezeDays() { return 15 }
	private ignoreRemainingRestrictions = false
	@Watch("ignoreRemainingRestrictions") private onIgnoreRemainingRestrictionsChange(){
		this.freezingPeriod = Math.min(this.freezingPeriod, this.RemainingFreezeDays, this.MaximumPeriod)
	}

	private allowBackDating = false

	private freezingPeriod = this.MinimumPeriod
	@Watch("freezingPeriod") private onFreezePeriodChange() {
		if (moment(this.freezeEnd).diff(this.freezeStart, "days") + 1 !== this.freezingPeriod)
		this.freezeEnd = moment(this.freezeStart).add(this.freezingPeriod, "days").toISOString().substr(0,10)
	}

	private freezeStart = new Date().toISOString().substr(0, 10)
	private freezeStartFormatted = this.formatDate(this.freezeStart)
	private freezeStartMenu = false
	@Watch("freezeStart") private onFreezeStartChanged() { this.freezeStartFormatted = this.formatDate(this.freezeStart) }
	private XfreezeStartMin = new Date().toISOString().substr(0, 10)
	private get freezeStartMin() { return this.allowBackDating? this.XfreezeStartMin: moment().toISOString().substr(0,10) }
	private get freezeStartMax() {
		return moment.max([
			moment(this.freezeEndMax).subtract(this.MinimumPeriod, "days"),
			moment(this.XfreezeStartMin),
		]).toISOString().substr(0,10)
	}
	@Watch("freezeStartMin")
	@Watch("freezeStartMax")
	private onFreezeStartRangeChange(){
		let freezeStart = moment(this.freezeStart)
		freezeStart = moment.min([
			moment.max([ freezeStart, moment(this.freezeStartMin), ]),
			moment(this.freezeStartMax),
		])
		this.freezeStart = freezeStart.add(1, "day").toISOString().substr(0,10)
	}

	private freezeEnd = moment().add(this.freezingPeriod - 1, "days").toISOString().substr(0, 10)
	private freezeEndFormatted = this.formatDate(this.freezeEnd)
	private freezeEndMenu = false
	@Watch("freezeEnd") private onFreezeEndChanged() { this.freezeEndFormatted = this.formatDate(this.freezeEnd) }
	private get freezeEndMin() { return moment(this.freezeStart).add(this.MinimumPeriod, "days").toISOString().substr(0,10) }
	private XfreezeEndMax = new Date(2019, 11, 31).toISOString().substr(0, 10)
	private get freezeEndMax() { return this.XfreezeEndMax }
	@Watch("freezeEndMin")
	@Watch("freezeEndMax")
	private onFreezeEndRangeChange() {
		let freezeEnd = moment(this.freezeEnd)
		freezeEnd = moment.min([
			moment.max([freezeEnd, moment(this.freezeEndMin),]),
			moment(this.freezeEndMax),
		])
		this.freezeEnd = freezeEnd.add(1, "day").toISOString().substr(0, 10)
	}

	@Watch("freezeStart")
	@Watch("freezeEnd")
	private onFreezeRangeChange(){
		this.freezingPeriod = moment(this.freezeEnd).diff(this.freezeStart, "days") + 1
	}

	private FreezeWarning = ""
	private FreezeError = ""

	@Watch("freezeStart")
	@Watch("freezeEnd")
	@Watch("freezingPeriod")
	private onFreezeRangePeriodChange(){
		this.FreezeError = ""
		this.FreezeWarning = ""
		if(this.ignoreRemainingRestrictions){
			if (this.freezingPeriod > this.RemainingFreezeDays) this.FreezeWarning = "Freezing period exceeds the recommended limit"

		} else {
			if (this.freezingPeriod > this.RemainingFreezeDays) this.FreezeError = "Freezing period is more than the remaining Freezing period"
			if (this.RemainingFreezeCount < 1) this.FreezeError = "No more Freezing available"
		}
	}

	private get TransactionData(): TFreezeTransaction{
		return {
			start: this.freezeStart,
			end: this.freezeEnd,
			period: this.freezingPeriod,
		}
	}
}
