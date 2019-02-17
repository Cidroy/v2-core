import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator"
import moment from "moment"
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import { formatDate, parseDate } from "@/utils/misc"
import { MiscStore } from "@/state/modules/misc"
import { TMRegistrationStep3, defaultRegistrationStep3User, TMRegistrationStep4, defaultRegistrationStep4User, TMRegistration, defaultRegistrationUser } from "@/classes/types/registration"
import { PaymentDetail } from "@/classes/types/payment"

import Gymkonnect from "@classes/gymkonnect"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger("gk/payment/modal-single")

@Component({
	// @ts-ignore
	components: { Layout, },
	created() {
		this.computePrimaryUser()
	},
})
// @ts-ignore
export default class SinglePaymentModal extends Vue {
	private formatDate(date) { return formatDate(date) }
	private parseDate(date) { return formatDate(date) }

	private primaryUser: TMRegistration = defaultRegistrationUser
	private get enforcer() {
		return this.users[Object.keys(this.users)[0]].firstName
	}

	@Watch("value")
	@Watch("users")
	@Watch("group")
	private computePrimaryUser() {
		Console.log("recalculating")
		this.primaryUser = this.users[Object.keys(this.users)[0]]
		this.transactionQty = Object.keys(this.users).length

		Gymkonnect.Registration.getAmount({
			membershipType: this.primaryUser.membershipType,
			packageType: this.primaryUser.packageType,
			timeSlot: this.primaryUser.timeSlot,
			category: this.primaryUser.category,
			group: this.group
		})
			.then(transactionPrice => { this.transactionPrice = transactionPrice })
			.catch(e => { Console.error(e) })

		Gymkonnect.Registration.getAdmissionFee()
			.then(admissionFeePrice => { this.admissionFeePrice = admissionFeePrice })
			.catch(e => { Console.error(e) })
	}

	private receipt = "1"
	private get userFullName() { return `${this.primaryUser.firstName} ${this.primaryUser.middleName} ${this.primaryUser.lastName}` }
	private get badgenumber() { return this.primaryUser.badgenumber }
	private get mobileNumber() { return this.primaryUser.mobile }
	private get whatsappNumber() { return this.primaryUser.whatsappNumber }
	private get doj() { return this.primaryUser.doj }
	private get dojFormatted() { return this.formatDate(this.doj) }
	private get startDate() { return this.formatDate(this.doj) }
	private get endDate() { return this.formatDate(this.doj) }

	private admissionFee = "Admission Fee"
	private admissionFeePrice = 0
	private get admissionFeeQty() { return this.transactionQty }
	private get admissionFeeAmount() { return this.admissionFeeQty * this.admissionFeePrice }

	private get membership() {
		let temp = MiscStore.MEMBERSHIP_TYPE(this.transaction.membershipType)
		return temp !== undefined ? temp.name : "Invalid"
	}
	private get packagex() {
		let temp = MiscStore.PACKAGE(this.transaction.packageType)
		return temp !== undefined ? temp.name : "Invalid"
	}
	private get timeSlot() {
		let temp = MiscStore.TIME_SLOT(this.transaction.timeSlot)
		return temp !== undefined ? temp.name : "Invalid"
	}

	private transactionQty = 1
	private transactionPrice = 0
	private get transactionAmount() { return this.transactionQty * this.transactionPrice }

	private offer: string | boolean = false
	private get OFFERS() { return MiscStore.ALL_OFFERS }

	private paymentMode = MiscStore.PAYMENT_MODES[0].id
	private get PAYMENT_MODES() { return MiscStore.PAYMENT_MODES }
	private transactionId = "0000"
	private get paymentModeIndex() { return (this.paymentMode && false) || MiscStore.PAYMENT_MODES.findIndex(i => i.id === this.paymentMode) }
	private get requireTransactionId() { return this.PAYMENT_MODES[this.paymentModeIndex].requireTransactionId }

	private get subTotal() {
		return this.admissionFeeAmount
			+ this.transactionAmount
	}
	private discount = 0
	private get total() {
		return this.subTotal
			- this.discount
	}

	private showModal = false
	@Watch("showModal") private onShowModalChange() { this.inputEmitter() }
	@Prop({ type: Boolean, default: false }) public value!: boolean
	@Watch("value") private onValueChange() { this.showModal = this.value }
	@Emit("input") public inputEmitter() { return this.showModal }

	@Prop({
		type: Object, default: () => ({
			...defaultRegistrationStep3User,
			...defaultRegistrationStep4User,
		})
	}) public transaction !: TMRegistrationStep3 & TMRegistrationStep4

	@Prop({ type: Object, default: () => ({}) }) public users !: { [index: string]: TMRegistration }
	@Prop({ default: 0 }) public group !: string | number

	@Emit("pay") public finish(): PaymentDetail {
		this.showModal = false
		return {
			id: "",
			amount: this.total,
			mode: this.paymentMode,
			transactionId: this.transactionId,
			receipt: this.receipt,
			offer: <string>this.offer,
		}
	}
}