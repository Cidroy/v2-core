import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import { debounce } from "lodash-decorators"
import moment from "moment"
import Layout from "@plugins/core/layouts/layout.vue"
import { GymkonnectStore } from "@plugins/gymkonnect/state/gymkonnect"
import { formatDate, parseDate } from "@plugins/core/utils/misc"
import { TMRegistrationStep3, defaultRegistrationStep3User } from "@plugins/gymkonnect/classes/types/registration"

import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`step-3.vue/registration/gk`)
// @ts-ignore
@Component({
	components: { Layout, },
	created() {
		if(this.value){
			this.onValueChange()
		} else {
			this.membershipType = (this.MEMBERSHIP_TYPES[0] || { id: 0 }).id
			this.packageType = (this.PACKAGES[0] || { id: 0 }).id
			this.timeSlot = (this.TIME_SLOTS[0] || { id: 0 }).id
		}
		this.recalculateSubTotal()
	}
})
export default class MRegistrationStep3 extends Vue.default {
	private formatDate(date: string) { return formatDate(date) }
	private parseDate(date: string) { return parseDate(date) }
	private error = ""
	@Watch("error") private onError(){ this.errorEmitter()  }
	@Emit("error") public errorEmitter(){ return this.error }

	private formValid = true

	private membershipType: number | string = ""
	private get MEMBERSHIP_TYPES() { return GymkonnectStore.GK_MEMBERSHIP_TYPES }

	private packageType: number | string = ""
	private get PACKAGES() { return GymkonnectStore.GK_PACKAGES }

	private timeSlot: number | string = ""
	private get TIME_SLOTS() { return GymkonnectStore.GK_TIME_SLOTS }

	private category: string | number = (GymkonnectStore.GK_CATEGORIES[0] || { id: 0 }).id
	private get Categories() { return GymkonnectStore.GK_CATEGORIES }

	private doj = new Date().toISOString().substr(0, 10)
	private dojFormatted = this.formatDate(this.doj)
	private dojMenu = false
	@Watch("doj") private onDateChanged() { this.dojFormatted = this.formatDate(this.doj) }
	private get _minDoj() { return this.allowBackDating ? new Date(1947, 7, 16) : this.dojRange.start }
	private get minDoj() { return moment(this._minDoj).toISOString().substr(0, 10) }
	private allowBackDating = false
	private get _maxDoj(){ return this.dojRange.end }
	private get maxDoj(){ return this.dojRange.end? moment(this._maxDoj).toISOString().substr(0,10): undefined }
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
	@debounce()
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
	@debounce()
	private async recalculateSubTotal() {
		this.priceLoading = true
		try {
			this.error = ""
			this.subTotal = this.packageMagnitude * await Gymkonnect.MemberRegistration.getAmount({
				membershipType: this.membershipType,
				packageType: this.packageType,
				timeSlot: this.timeSlot,
				category: this.category,
				group: this.group
			})
		} catch (error) {
			Console.error(error)
			this.error = error.toString()
		}
		this.priceLoading = false
	}

	@Prop({ type: Object, default: () => ({ start: new Date(), end: undefined }) }) public dojRange !: { start: Date, end?: Date }
}
