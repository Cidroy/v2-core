import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import moment from "moment"
import appConfig from "@/app.config"
import { GymkonnectStore } from "@plugins/gymkonnect/state/gymkonnect"
import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import { defaultRegistrationStep1User, defaultRegistrationStep2User, defaultRegistrationStep3User } from "@plugins/gymkonnect/classes/types/registration"
import { Logger } from "@classes/CONSOLE"
import { alert } from "@/components/toast"
import { formatDate, parseDate } from "@/utils/misc"
import { PaymentDetail } from "@plugins/gymkonnect/classes/types/payment"

import Layout from "@/layouts/layout.vue"
import stepper from "@plugins/gymkonnect/components/member/registration/stepper.vue"
import stepFinished from "@plugins/gymkonnect/components/member/registration/step-finished.vue"
import SpaBookingModal from "../payment/modal-booking-spa.vue"
import uuid from "uuid"

const Console = new Logger(`spa-booking.vue/gk`)

type TSessions = Record<string, {
	date: string,
	dateFormatted: string,
	time: string,
}>
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
		this.Initialize()
	}
})
// @ts-ignore
export default class FitnessCounselingRegistration extends Vue{
	private get formatDate() { return formatDate }
	private get parseDate() { return parseDate }

	private Initialize(){
		this.reCalculateAmount()
		this.onSessionCountChange()
	}

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
	// #endregion

	// #region registration
	private stepperComplete(clientId: string | number) {
		this.clientId = clientId
	}

	private get COUNSELLORS(){ return GymkonnectStore.GK_FC_COUNSELLOR }

	private purposes: (string | number)[] = []
	private get PURPOSES(){ return GymkonnectStore.GK_FC_PURPOSES }

	private dateMenu = false
	private dateIndex = ""
	private date = new Date().toISOString().substr(0, 10)
	private dateFormatted = formatDate(this.date)
	private showDatePicker(key: string) {
		this.dateIndex = key
		this.date = this.sessions[key].date
		this.dateMenu = true
	}
	private saveDate() {
		this.dateFormatted = formatDate(this.date)
		this.sessions[this.dateIndex].date = this.date
		this.sessions[this.dateIndex].dateFormatted = this.dateFormatted
	}

	private timeMenu = false
	private timeIndex = ""
	private time = "06:00"
	private showTimePicker(key: string) {
		this.timeIndex = key
		this.time = this.sessions[key].time
		this.timeMenu = true
	}
	private saveTime() { this.sessions[this.timeIndex].time = this.time }

	// FIXME: [Vicky] get from gql
	private get MinSessionCount(){ return 1 }
	private get MaxSessionCount(){ return 10 }
	private sessions: TSessions = {}
	private SessionsCount = 0
	private sessionCount = this.MinSessionCount
	@Watch("sessionCount")
	private onSessionCountChange(){
		let SessionsCount = Object.keys(this.sessions).length
		if(SessionsCount < this.sessionCount) this.sessions[uuid()] = this.DefaultSession().default
		else if ( SessionsCount > this.sessionCount ){
			let lastIndex = Object.keys(this.sessions).splice(-1)[0]
			if(lastIndex!==undefined) delete this.sessions[lastIndex]
		}
		this.SessionsCount = Object.keys(this.sessions).length
	}

	// FIXME: [Vicky] get from gql
	private get MinSessionDate(){ return new Date().toISOString().substr(0,10) }
	private get MaxSessionDate(){ return new Date(2020, 11, 31).toISOString().substr(0,10) }
	private DefaultSession(): TSessions{
		return {
			default: {
				date: this.MinSessionDate,
				dateFormatted: formatDate(this.MinSessionDate),
				time: "12:00",
			}
		}
	}
	private deleteSession(sessionIndex: string){
		delete this.sessions[sessionIndex]
		this.sessionCount --
	}

	private priceLoading = false
	private amount = 0

	@Watch("purposes")
	private async reCalculateAmount(){
		this.priceLoading = true
		try {
			this.error = ""
			this.amount = await Gymkonnect.Registrations.FitnessCounseling.getAmount(this.transaction)
		} catch (error) {
			Console.error(error)
			this.error = error.toString()
		}
		this.priceLoading = false
	}

	private get transaction(){
		return {
			purposes: this.purposes,
			x: 1,
		}
	}
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