import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator"
import Layout from "@/layouts/layout.vue"
import { formatDate, parseDate } from "@/utils/misc"
import { GymkonnectStore } from "@plugins/gymkonnect/state/gymkonnect"
import { TMRegistrationStep3, defaultRegistrationStep3User, TMRegistrationStep4, defaultRegistrationStep4User, TMRegistration, defaultRegistrationUser } from "@plugins/gymkonnect/classes/types/registration"
import { PaymentDetail } from "@plugins/gymkonnect/classes/types/payment"

import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import { Logger } from "@classes/CONSOLE"
import moment from "moment"

const Console = new Logger("gk/payment/modal-single")

@Component({
	// @ts-ignore
	components: { Layout, },
	created() {
		this.Initialize()
		this.computePrimaryUser()
	},
})
// @ts-ignore
export default class SinglePaymentModal extends Vue {
	private get formatDate() { return formatDate }
	private get parseDate() { return parseDate }

	private async Initialize(){
		this.receipt = await Gymkonnect.receiptNumber()
	}

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
		this.packageMagnitude = this.transaction.packageMagnitude

		Gymkonnect.MemberRegistration.getAmount({
			membershipType: this.primaryUser.membershipType,
			packageType: this.primaryUser.packageType,
			timeSlot: this.primaryUser.timeSlot,
			category: this.primaryUser.category,
			group: this.group
		})
			.then(transactionPrice => { this.transactionPrice = transactionPrice })
			.catch(e => { Console.error(e) })

		this.addAdmissionFee && Gymkonnect.MemberRegistration.getAdmissionFee()
			.then(admissionFeePrice => { this.admissionFeePrice = admissionFeePrice })
			.catch(e => { Console.error(e) })

		Gymkonnect.MemberRegistration.getEndDate({
			startDate: moment(this.transaction.doj).toDate(),
			packages: this.transaction.packageType,
			packageMagnitude: this.transaction.packageMagnitude
		})
			.then(end => { this.end = end.toISOString().substr(0, 10) })
			.catch(e => { Console.error(e) })
	}

	private receipt: string | number = "1"
	private get userFullName() {
		return `${this.primaryUser.firstName || ""} ${this.primaryUser.middleName || ""} ${this.primaryUser.lastName || ""}`
			.replace(/\s+/, " ")
			.trimRight()
	}
	private get badgenumber() { return this.primaryUser.badgenumber }
	private get mobileNumber() { return this.primaryUser.mobile }
	private get whatsappNumber() { return this.primaryUser.whatsappNumber }
	private get doj() { return this.primaryUser.doj }
	private get dojFormatted() { return this.formatDate(this.doj) }
	private get startDate() { return this.formatDate(this.doj) }
	private end = this.doj
	private get endDate(){ return this.formatDate(this.end) }

	private admissionFee = "Admission Fee"
	private admissionFeePrice = 0
	private get admissionFeeQty() { return 1 }
	private get admissionFeeAmount() { return this.addAdmissionFee? this.admissionFeeQty * this.admissionFeePrice: 0 }

	private get membership() {
		let temp = GymkonnectStore.GK_MEMBERSHIP_TYPE(this.transaction.membershipType)
		return temp !== undefined ? temp.name : "Invalid"
	}
	private get packagex() {
		let temp = GymkonnectStore.GK_PACKAGE(this.transaction.packageType)
		return temp !== undefined ? temp.name : "Invalid"
	}
	private get timeSlot() {
		let temp = GymkonnectStore.GK_TIME_SLOT(this.transaction.timeSlot)
		return temp !== undefined ? temp.name : "Invalid"
	}

	private packageMagnitude = 1

	private transactionQty = 1
	private transactionPrice = 0
	private get transactionAmount() { return this.packageMagnitude * this.transactionPrice }

	private offer: string | boolean | number = false
	private get OFFERS() { return GymkonnectStore.GK_ALL_OFFERS }

	private paymentMode = GymkonnectStore.GK_PAYMENT_MODES[0].id
	private get PAYMENT_MODES() { return GymkonnectStore.GK_PAYMENT_MODES }
	private transactionId = "0000"
	private get paymentModeIndex() { return (this.paymentMode && false) || GymkonnectStore.GK_PAYMENT_MODES.findIndex(i => i.id === this.paymentMode) }
	private get requireTransactionId() { return this.PAYMENT_MODES[this.paymentModeIndex].requireTransactionId }

	private get subTotal() {
		return (this.admissionFeeAmount + this.transactionAmount) * this.transactionQty
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

	@Prop({ type: Boolean, default : false }) public addAdmissionFee !: boolean
	@Prop({ type: String, default : "Credit Bill" }) public billTitle !: string
}