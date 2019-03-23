import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator"
import moment from "moment"
import Layout from "@/layouts/layout.vue"
import { formatDate, parseDate } from "@/utils/misc"
import { GymkonnectStore } from "@plugins/gymkonnect/state/misc"
import { PaymentDetail } from "@plugins/gymkonnect/classes/types/payment"
import { TMRegistration } from "@plugins/gymkonnect/classes/types/registration"

import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import { Logger } from "@classes/CONSOLE"
import { TSpaBookingArgs, defaultSpaBookingArgs } from "@plugins/gymkonnect/classes/types/bookings"

const Console = new Logger("gk/payment/modal-single")

@Component({
	// @ts-ignore
	components: { Layout, },
	created(){
		this.Initialize()
	}
})
// @ts-ignore
export default class SpaBookingModal extends Vue {
	private get formatDate() { return formatDate }
	private get parseDate() { return parseDate }

	private async Initialize() {
		this.receipt = await Gymkonnect.receiptNumber()
	}

	private async refresh(){
		// TODO:
	}

	private receipt: string | number = "1"
	private get userFullName() {
		return `${this.user.firstName || ""} ${this.user.middleName || ""} ${this.user.lastName || ""}`
			.replace(/\s+/, " ")
			.trimRight()
	}
	private get badgenumber() { return this.user.badgenumber }
	private get mobileNumber() { return this.user.mobile }
	private get whatsappNumber() { return this.user.whatsappNumber }

	private paymentMode = GymkonnectStore.GK_PAYMENT_MODES[0].id
	private get PAYMENT_MODES() { return GymkonnectStore.GK_PAYMENT_MODES }
	private transactionId = "0000"
	private get paymentModeIndex() { return (this.paymentMode && false) || GymkonnectStore.GK_PAYMENT_MODES.findIndex(i => i.id === this.paymentMode) }
	private get requireTransactionId() { return this.PAYMENT_MODES[this.paymentModeIndex].requireTransactionId }

	private get AmenityNames(){
		return  this.transaction.amenities.map(a => GymkonnectStore.GK_SPA_AMENITY(a)!.name)
			.filter(i => !!i)
	}
	private get Attendees(){ return this.transaction.attendeeCount }
	private get AttendingDate(){ return moment(this.transaction.doj).toISOString().substr(0,10) }
	private get Amount(){ return this.transaction.amount }

	private get subTotal() { return this.Amount }

	private discount = 0
	private get total() {
		return this.subTotal
			- this.discount
	}

	private showModal = false
	@Watch("showModal") private onShowModalChange() {
		this.refresh()
		this.inputEmitter()
	}
	@Prop({ type: Boolean, default: false }) public value!: boolean
	@Watch("value") private onValueChange() { this.showModal = this.value }
	@Emit("input") public inputEmitter() { return this.showModal }

	@Emit("pay") public finish(): PaymentDetail {
		this.showModal = false
		return {
			id: "",
			amount: this.total,
			mode: this.paymentMode,
			transactionId: this.transactionId,
			receipt: this.receipt,
			offer: 0,
		}
	}

	@Prop({
		type: Object, default: () => defaultSpaBookingArgs
	}) public transaction !: TSpaBookingArgs
	@Prop({ type: Object, default: () => ({}) }) public user !: TMRegistration
	@Prop({ type: String, default: "Spa Booking Receipt" }) public billTitle !: string
}