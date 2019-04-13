import { Component, Vue, Prop, Watch } from "vue-property-decorator"
import moment from "moment"
import appConfig from "@/app.config"
import Layout from "@/layouts/layout.vue"
import { formatDate, parseDate } from "@/utils/misc"
import { GymkonnectStore } from "@plugins/gymkonnect/state/gymkonnect"

@Component({
	// @ts-ignore
	components: {
		Layout,
	},
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},
})
export default class SinglePaymentPage extends Vue.default {
	private formatDate(date: string) { return formatDate(date) }
	private parseDate(date: string) { return parseDate(date) }

	private doj = new Date().toISOString().substr(0, 10)
	private dojFormatted = this.formatDate(this.doj)
	private dojMenu = false
	private get x_minDoj() { return this.allowBackDating ? new Date(1947, 7, 16) : new Date() }
	@Watch("doj") private onDateChanged() { this.dojFormatted = this.formatDate(this.doj) }
	private get minDoj() { return moment(this.x_minDoj).toISOString().substr(0, 10) }
	private allowBackDating = false

	private receipt = "1"
	private userFullName = "John Doe"
	private userId = "00001212"
	private mobileNumber = "0000000000"
	private whatsappNumber = "0000000000"

	private admissionFee = 1000
	private membership = "Gold"
	private membershipQty = 1
	private membershipPrice = 5000
	private get membershipAmount() { return this.membershipQty * this.membershipPrice }

	private packagex = "Monthly"
	private packagexQty = 1
	private packagexPrice = 5000
	private get packagexAmount() { return this.packagexQty * this.packagexPrice }
	private startDate = this.formatDate(new Date().toISOString().substr(0, 10))
	private endDate = this.formatDate(new Date().toISOString().substr(0, 10))

	private timeSlot = "Peak Hours"
	private timeSlotQty = 1
	private timeSlotPrice = 500
	private get timeSlotAmount() { return this.packagexQty * this.packagexPrice }

	private get subTotal() {
		return this.admissionFee
			+ this.membershipAmount
			+ this.packagexAmount
			+ this.timeSlotAmount
	}
	private discount = 0
	private get total() {
		return this.subTotal
			+ this.discount
	}

	private transactionId = "0000"

	private paymentMode = 0
	private get PAYMENT_MODES() { return GymkonnectStore.GK_PAYMENT_MODES }
	private get requireTransactionId() { return this.PAYMENT_MODES[this.paymentMode].requireTransactionId }

	private offers = [
		"Custom",
		"Couple",
		"New year",
		"Student",
	]

	@Prop({ type: Object }) public userData !: {}
	@Watch("userData") private onUserData() { }
}