import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator"
import Layout from "@/layouts/layout.vue"
import { formatDate, parseDate } from "@/utils/misc"
import { GymkonnectStore } from "@plugins/gymkonnect/state/gymkonnect"
import { PaymentDetail } from "@plugins/gymkonnect/classes/types/payment"

import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import { Logger } from "@classes/CONSOLE"
import { TMemberInfo, defaultMemberInfo } from "@plugins/gymkonnect/classes/types/misc"

const Console = new Logger("gk/payment/modal-single")

// @ts-ignore
@Component({
	components: { Layout, },
	created() {
		this.Initialize()
	},
})
export default class GeneralPaymentModal extends Vue.default {
	private get formatDate() { return formatDate }
	private get parseDate() { return parseDate }

	private async Initialize(){
		this.receipt = await Gymkonnect.receiptNumber()
	}

	private receipt: string | number = "1"

	private offer: string | boolean | number = false
	private get OFFERS() { return GymkonnectStore.GK_ALL_OFFERS }

	private paymentMode = (GymkonnectStore.GK_PAYMENT_MODES[0] || { id: 0 }).id
	private get PAYMENT_MODES() { return GymkonnectStore.GK_PAYMENT_MODES }
	private transactionId = "0000"
	private get paymentModeIndex() { return (this.paymentMode && false) || GymkonnectStore.GK_PAYMENT_MODES.findIndex(i => i.id === this.paymentMode) }
	private get requireTransactionId() { return this.PAYMENT_MODES[this.paymentModeIndex].requireTransactionId }

	private get SubTotal() { return this.Amount }
	private discount = 0
	private get Total() { return this.SubTotal - this.discount }

	private showModal = false
	@Watch("showModal") private onShowModalChange() { this.inputEmitter() }
	@Prop({ type: Boolean, default: false }) public value!: boolean
	@Watch("value") private onValueChange() { this.showModal = this.value }
	@Emit("input") public inputEmitter() { return this.showModal }

	@Emit("pay") public finish(): PaymentDetail {
		this.showModal = false
		return {
			id: "",
			amount: this.Total,
			mode: this.paymentMode,
			description: this.Description,
			transactionId: this.transactionId,
			receipt: this.receipt,
			offer: <string>this.offer,
		}
	}

	private get UserName(){
		return `${this.User.firstName || ""} ${this.User.middleName || ""} ${this.User.lastName || ""}`
			.replace(/\s+/, " ")
			.trimRight()
	}

	@Prop({ type: Object, default: defaultMemberInfo() }) public User !: TMemberInfo
	@Prop({ type: String, default: "" }) public DateTitle !: "Date"
	@Prop({ type: String, default: new Date().toISOString().substr(0,10) }) public DateValue !: string
	@Prop({ type: Number, default: 0 }) public Qty !: number
	@Prop({ type: Number, default: 0 }) public Price !: number
	@Prop({ type: Number, default: 0 }) public Amount !: number
	@Prop({ type: String, default: "" }) public Description !: string
	@Prop({ type: String, default : "Payment Receipt" }) public BillTitle !: string
}
