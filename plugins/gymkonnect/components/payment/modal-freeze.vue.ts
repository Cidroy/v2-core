import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator"
import Layout from "@/layouts/layout.vue"
import { formatDate, parseDate } from "@/utils/misc"
import { GymkonnectStore } from "@plugins/gymkonnect/state/gymkonnect"
import { PaymentDetail } from "@plugins/gymkonnect/classes/types/payment"
import { TMRegistration } from "@plugins/gymkonnect/classes/types/registration"

import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import { Logger } from "@classes/CONSOLE"
import moment from "moment"
import { TFreezeTransaction, defaultFreezeTransation } from "@plugins/gymkonnect/classes/types/freeze"

const Console = new Logger("gk/payment/modal-single")

// @ts-ignore
@Component({
	components: { Layout, },
	created(){
		this.Initialize()
	}
})
export default class FreezePaymentModal extends Vue.default {
	private get formatDate() { return formatDate }
	private get parseDate() { return parseDate }

	private async Initialize() {
		this.receipt = await Gymkonnect.receiptNumber()
	}

	private async refresh(){
		[
			this.basePrice,
			this.amount,
		] = await Promise.all([
			Gymkonnect.Freezing.basePrice(this.user.id, this.currentTransactionId),
			Gymkonnect.Freezing.amount(this.user.id, this.currentTransactionId, this.transaction),
		])
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

	private paymentMode = (GymkonnectStore.GK_PAYMENT_MODES[0] || { id: 0 }).id
	private get PAYMENT_MODES() { return GymkonnectStore.GK_PAYMENT_MODES }
	private transactionId = "0000"
	private get paymentModeIndex() { return (this.paymentMode && false) || GymkonnectStore.GK_PAYMENT_MODES.findIndex(i => i.id === this.paymentMode) }
	private get requireTransactionId() { return this.PAYMENT_MODES[this.paymentModeIndex].requireTransactionId }

	private basePrice = 0
	private amount = 0
	private get Start(){ return this.transaction.start }
	private get End(){ return this.transaction.end }
	private get Period(){ return this.transaction.period }
	private get Amount(){ return this.amount + this.basePrice }

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
		type: Object, default: () => defaultFreezeTransation
	}) public transaction !: TFreezeTransaction
	@Prop({ type: Object, default: () => ({}) }) public user !: TMRegistration
	@Prop({ type: String, default: "Freezing Payment Receipt" }) public billTitle !: string
	@Prop({ type: [Number, String, ], default: 0 }) public currentTransactionId !: string | number
}
