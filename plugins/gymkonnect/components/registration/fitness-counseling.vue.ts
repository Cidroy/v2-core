import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import moment from "moment"
import appConfig from "@/app.config"
import { GymkonnectStore } from "@plugins/gymkonnect/state/misc"
import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import { defaultRegistrationStep1User, defaultRegistrationStep2User } from "@plugins/gymkonnect/classes/types/registration"
import { Logger } from "@classes/CONSOLE"
import { alert } from "@/components/toast"
import { formatDate, parseDate } from "@/utils/misc"
import { PaymentDetail } from "@plugins/gymkonnect/classes/types/payment"

import Layout from "@/layouts/layout.vue"
import stepper from "@plugins/gymkonnect/components/member/registration/stepper.vue"
import stepFinished from "@plugins/gymkonnect/components/member/registration/step-finished.vue"
import SpaBookingModal from "../payment/modal-booking-spa.vue"
import { TSpaBookingArgs } from "@plugins/gymkonnect/classes/types/bookings"

const Console = new Logger(`spa-booking.vue/gk`)
@Component({
	// @ts-ignore
	components: {
		Layout,
		stepper,
		stepFinished,
		SpaBookingModal,
	},
	page : {
		title: "Fitness Counseling Registration",
		meta: [{ name: "Fitness Counseling Registration", content: appConfig.description, }, ],
	},
	created(){
		this.reCalculateAmount()
		this.onGroupingChange()
	}
})
// @ts-ignore
export default class FitnessCounselingRegistration extends Vue{
	private get formatDate() { return formatDate }
	private get parseDate() { return parseDate }

	private error = ""
	private clientId: string | number = ""
	private clientData: Unpacked<ReturnType<typeof Gymkonnect.Members.info>> = {
		...defaultRegistrationStep1User,
		...defaultRegistrationStep2User,
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
	// #endregion

	// #region registration
	private stepperComplete(clientId: string | number) {
		this.clientId = clientId
	}

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

	private purposes = []
	private get PURPOSES(){ return GymkonnectStore.GK_FC_PURPOSES }
	// #endregion

	// #region props
	@Prop({ type: [String, Number,], default: "" }) public value !: string | number
	@Prop({ type: Object, default: () => ({ start: new Date(), end: undefined }) }) public dojRange !: { start: Date, end?: Date }
	// #endregion

	// #region payment
	private paymentModel = false
	private paymentCancelled() { }

	private paying = false
	private async pay(paymentData?: PaymentDetail) {
		this.paying = true
		try {
			// TODO: reset page to zero and goto top
		} catch (error) {
			Console.error(error)
			alert(error.toString(), "error")
		}
		this.paying = false
	}
	// #endregion
}