import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import moment from "moment"
import Layout from "@/layouts/main.vue"
import { MiscStore } from "@/state/modules/misc"
import { formatDate, parseDate } from "@/utils/misc"
import { TMRegistrationStep3, defaultRegistrationStep3User } from "@/classes/types/registration"

import Gymkonnect from "@classes/gymkonnect"

@Component({
	// @ts-ignore
	components: { Layout, },
	created() {
		this.membershipType = this.MEMBERSHIP_TYPES[0].id
		this.packageType = this.PACKAGES[0].id
		this.timeSlot = this.TIME_SLOTS[0].id
		this.recalculateSubTotal()
	}
})
// @ts-ignore
export default class MRegistrationStep3 extends Vue {
	private formatDate(date: string) { return formatDate(date) }
	private parseDate(date: string) { return parseDate(date) }

	private formValid = true

	private membershipType: number | string = ""
	private get MEMBERSHIP_TYPES() { return MiscStore.MEMBERSHIP_TYPES }

	private packageType: number | string = ""
	private get PACKAGES() { return MiscStore.PACKAGES }

	private timeSlot: number | string = ""
	private get TIME_SLOTS() { return MiscStore.TIME_SLOTS }

	private category: string | number = MiscStore.CATEGORIES[0].id
	private get Categories() { return MiscStore.CATEGORIES }

	private doj = new Date().toISOString().substr(0, 10)
	private dojFormatted = this.formatDate(this.doj)
	private dojMenu = false
	private get _minDoj() { return this.allowBackDating ? new Date(1947, 7, 16) : new Date() }
	@Watch("doj") private onDateChanged() { this.dojFormatted = this.formatDate(this.doj) }
	private get minDoj() { return moment(this._minDoj).toISOString().substr(0, 10) }
	private allowBackDating = false
	private get getDateFormatted() { return this.formatDate(this.doj) }

	private get userData() {
		return {
			...this.value,
			category: this.category,
			membershipType: this.membershipType,
			packageType: this.packageType,
			timeSlot: this.timeSlot,
			doj: this.doj,
			packageMagnitude: this.packageMagnitude
		}
	}
	@Prop({
		type: Object,
		default: () => defaultRegistrationStep3User
	}) public value !: TMRegistrationStep3
	@Emit("input") public inputEmitter() { return this.userData }
	@Watch("value") private onValueChange() {
		this.membershipType = this.value.membershipType
		this.packageType = this.value.packageType
		this.timeSlot = this.value.timeSlot
		this.category = this.value.category
		this.doj = this.value.doj
		this.packageMagnitude = this.value.packageMagnitude
	}

	private formReset() {
		// @ts-ignore
		this.$refs.form.reset()
	}

	private formNext() {
		// @ts-ignore
		if (this.$refs.form.validate()) {
			this.inputEmitter()
			this.nextStep()
		}
	}
	@Emit("nextStep") public nextStep() { return true }
	@Emit("cancel") public cancel() { return true }

	@Watch("membershipType")
	@Watch("packageType")
	@Watch("packageMagnitude")
	@Watch("timeSlot")
	@Watch("category")
	@Watch("doj")
	private doInputEmit() { this.inputEmitter() }

	private packageMagnitude = 1
	private get packageMagnitudeMax(){ return 3 }

	@Prop({ type: Number }) public group !: number
	@Prop({ type: Number, default: 1 }) public quantity !: number
	private subTotal = 0
	private get total() { return this.subTotal * this.quantity }
	private priceLoading = false

	@Watch("membershipType")
	@Watch("packageType")
	@Watch("packageMagnitude")
	@Watch("timeSlot")
	@Watch("category")
	@Watch("group")
	@Watch("quantity")
	private async recalculateSubTotal() {
		this.priceLoading = true
		this.subTotal = this.packageMagnitude * await Gymkonnect.Registration.getAmount({
			membershipType: this.membershipType,
			packageType: this.packageType,
			timeSlot: this.timeSlot,
			category: this.category,
			group: this.group
		})
		this.priceLoading = false
	}
}