import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import { debounce } from "lodash-decorators"
import moment from "moment"
import appConfig from "@/app.config"
import { GymkonnectStore } from "@plugins/gymkonnect/state/gymkonnect"
import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import { defaultRegistrationStep1User, defaultRegistrationStep2User, defaultRegistrationStep3User } from "@plugins/gymkonnect/classes/types/registration"
import { Logger } from "@classes/CONSOLE"
import { alert } from "@/components/toast"
import { formatDate, parseDate } from "@/utils/misc"
import { PaymentDetail } from "@plugins/gymkonnect/classes/types/payment"
import { TRPTTransation } from "@plugins/gymkonnect/classes/types/registrations"

import Layout from "@/layouts/layout.vue"
import stepFinished from "@plugins/gymkonnect/components/member/registration/step-finished.vue"
import GeneralPaymentModal from "../payment/modal-generic.vue"

const Console = new Logger(`spa-booking.vue/gk`)
@Component({
	// @ts-ignore
	components: {
		GeneralPaymentModal,
		Layout,
		stepFinished,
	},
	page : {
		title: "Personal Training Registration",
		meta: [{ name: "Personal Training Registration", content: appConfig.description, }, ],
	},
	created(){
		this.reCalculateAmount()
		this.onGroupingChange()
	}
})
// @ts-ignore
export default class PersonalTrainingRegistration extends Vue{
	private get formatDate() { return formatDate }
	private get parseDate() { return parseDate }

	private error = ""
	private clientId: string | number = ""
	private clientData: Unpacked<ReturnType<typeof Gymkonnect.Members.info>> = {
		...defaultRegistrationStep1User,
		...defaultRegistrationStep2User,
		transaction: {
			...defaultRegistrationStep3User,
			id: 0,
			start: new Date().toISOString().substr(0, 10),
			end: new Date().toISOString().substr(0, 10),
		}

	}
	@Watch("clientId") private async onClientIdChange() {
		if (!this.clientId) return
		this.clientDataLoading = true
		try {
			this.clientData = await Gymkonnect.Members.info(this.clientId)
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

	// #region search-engine
	private readonly label = "Search by Mobile Number or Badge Number"
	@Watch("value") private onValueChange() { this.clientId = this.value }
	@Emit("input") public inputEmitter() { return this.clientId }
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
	private get Clients(){
		return this.clients.filter(client => client.name.toLowerCase().includes(this.clientSearch?this.clientSearch.toLowerCase():"")
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
	// #endregion

	// #region booking
	private doj = new Date().toISOString().substr(0, 10)
	private dojFormatted = this.formatDate(this.doj)
	private dojMenu = false
	@Watch("doj") private onDateChanged() { this.dojFormatted = this.formatDate(this.doj) }
	private get _minDoj() { return this.allowBackDating ? new Date(1947, 7, 16) : this.dojRange.start }
	private get minDoj() { return moment(this._minDoj).toISOString().substr(0, 10) }
	private allowBackDating = false
	private get _maxDoj() { return this.dojRange.end }
	private get maxDoj() { return this.dojRange.end ? moment(this._maxDoj).toISOString().substr(0, 10) : undefined }
	private get getDateFormatted() { return this.formatDate(this.doj) }

	private grouping = (GymkonnectStore.GK_GROUPINGS[0] || { id: 0 }).id
	@Watch("grouping") private onGroupingChange() {
		let grouping = GymkonnectStore.GK_GROUPING(this.grouping)!
	}
	private get UsersCount() { return GymkonnectStore.GK_GROUPING(this.grouping)!.count }
	// TODO: [Vicky][Nikhil] implement spa grouping
	private get GROUPINGS() { return GymkonnectStore.GK_GROUPINGS }

	private purposes: (string | number)[] = []
	private get PURPOSES(){ return GymkonnectStore.GK_PT_PURPOSES }

	private packagex = (GymkonnectStore.GK_PT_PACKAGES[0] || { id: 0 }).id
	private get PACKAGES(){ return GymkonnectStore.GK_PT_PACKAGES }

	private trainerType = (GymkonnectStore.GK_PT_TRAINER_TYPES[0] || { id: 0 }).id
	private get TRAINER_TYPES(){ return GymkonnectStore.GK_PT_TRAINER_TYPES }

	// TODO: [Nishant] Min max time ka concept chahiye ka prefferedtimes main?
	private get MinPrefferedTime(){ return "06:00" }
	private get MaxPrefferedTime(){ return "10:00" }
	private timeFrom = this.MinPrefferedTime
	private timeFromMenu = false
	private timeTo = this.MaxPrefferedTime
	private timeToMenu = false

	private get QuantityMin(){ return 1 }
	private get QuantityMax(){ return 10 }
	private quantity = this.QuantityMin

	private price = 0
	private get Amount(){ return this.price * this.quantity }
	private priceLoading = false
	@Watch("grouping")
	@Watch("attendeeCount")
	@Watch("purposes")
	@Watch("packagex")
	@Watch("trainerType")
	@Watch("doj")
	@debounce()
	private async reCalculateAmount() {
		this.priceLoading = true
		try {
			this.error = ""
			this.price = await Gymkonnect.Registrations.PersonalTraining.getAmount(this.transaction)
		} catch (error) {
			Console.error(error)
			this.error = error.toString()
		}
		this.priceLoading = false
	}
	private get transaction(): TRPTTransation{
		return {
			grouping: this.grouping,
			purposes: this.purposes,
			package: this.packagex,
			trainerType: this.trainerType,
			doj: this.doj,
		}
	}
	// #endregion

	// #region props
	@Prop({ type: [String, Number,], default: "" }) public value !: string | number
	@Prop({ type: Object, default: () => ({ start: new Date(), end: undefined }) }) public dojRange !: { start: Date, end?: Date }
	// #endregion

	// #region payment
	private get purposesString(){ return this.purposes.map(i => GymkonnectStore.GK_PT_PURPOSE(i)!.name).filter(i => !!i) }

	private get PaymentDescription(){
		let purposes = this.purposesString.join(", ")
		let trainerType = GymkonnectStore.GK_PT_TRAINER_TYPE(this.trainerType)
		let ret =
			`Personal Training \n`
			+ (purposes ?`${  "for " + purposes + " ," } \n`: "")
			+ (trainerType ?`trainer type: ${ trainerType!.name }, \n` : "")
			+ `preffered time: ${this.timeFrom} to ${this.timeTo} \n`
		return ret
	}
	private paymentModel = false
	private paymentCancelled() { }

	private paying = false
	private async pay(paymentData?: PaymentDetail) {
		this.paying = true
		try {
			let result = await Gymkonnect.Registrations.PersonalTraining.pay(this.clientId, this.transaction, paymentData)
			alert("Saved", "success")
			// TODO: reset page to zero and goto top
		} catch (error) {
			Console.error(error)
			alert(error.toString(), "error")
		}
		this.paying = false
	}
	// #endregion
}