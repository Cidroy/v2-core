import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import { TMRegistrationStep2, defaultRegistrationStep2User } from "@/classes/types/registration"
import IAddress from "@classes/interface/IAddress"
import AddressStore from "@/state/modules/addresses"
import empty from "@/components/empty.vue"

@Component({
	// @ts-ignore
	components: { empty, },
	created() {
		this.onValueChange()
	},
})
// @ts-ignore
export default class MRegistrationStep2 extends Vue {
	private mobile: string = ""
	private whatsappNumber: string = ""
	private homeNumber: string = ""
	private officeNumber: string = ""
	private emergencyContactName: string = ""
	private emergencyContactNumber: string = ""
	private email: string = ""
	private sameAsPhone: boolean = true
	private homeSameAsPhone: boolean = true
	private address: Partial<IAddress> = {
		house: "",
		locality: "",
		landmark: "",
		city: "",
		state: "",
		country: "",
		pincode: "",
	}

	private get COUNTRIES() { return AddressStore.COUNTRIES() }
	private get STATES() { return AddressStore.STATES(this.address.country) }
	private get CITIES() { return AddressStore.CITIES(this.address.country, this.address.state) }

	@Watch("mobile")
	@Watch("sameAsPhone")
	@Watch("homeSameAsPhone")
	private onSameAsPhoneChange() {
		if (this.sameAsPhone) this.whatsappNumber = this.mobile
		if (this.homeSameAsPhone) this.homeNumber = this.mobile
	}

	private get rules() {
		return {
			mobile: [(v: any) => !!v || "Number is required",],
			whatsappNumber: [(v: any) => !!v || " Number is required",],
			homeNumber: [(v: any) => !!v || "Required",],
			emailRules: [(v: any) => !!v || "E-mail is required", (v: string) => /.+@.+/.test(v) || "E-mail must be valid",],
			address: {
				house: [(house: any) => !!house || "House Address is required",],
				city: [(city: any) => !!city || "City is required",],
				state: [(state: any) => !!state || "State is required",],
				pincode: [(pincode: any) => !!pincode || "Pincode is required",],
				country: [(country: any) => !!country || "country is required",],
			}
		}
	}
	private get userData() {
		return {
			...this.value,
			mobile: this.mobile,
			whatsappNumber: this.whatsappNumber,
			homeNumber: this.homeNumber,
			officeNumber: this.officeNumber,
			emergencyContactName: this.emergencyContactName,
			emergencyContactNumber: this.emergencyContactNumber,
			email: this.email,
			address: this.address,
		}
	}
	@Prop({
		type: Object,
		default: () => defaultRegistrationStep2User
	}) private value !: TMRegistrationStep2
	@Emit("input") public inputEmitter() { return this.userData }
	@Watch("value") private onValueChange() {
		this.mobile = this.value.mobile
		this.whatsappNumber = this.value.whatsappNumber
		this.homeNumber = this.value.homeNumber
		this.officeNumber = this.value.officeNumber
		this.emergencyContactName = this.value.emergencyContactName
		this.emergencyContactNumber = this.value.emergencyContactNumber
		this.email = this.value.email
		this.address = this.value.address
	}

	private formValid: boolean = true
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

	private autofocus = false
	private focus(isVisible: boolean) {
		// @ts-ignore
		this.autofocus = isVisible
	}
}