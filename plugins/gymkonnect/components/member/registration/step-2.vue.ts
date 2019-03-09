import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import { TMRegistrationStep2, defaultRegistrationStep2User } from "@plugins/gymkonnect/classes/types/registration"
import IAddress from "@classes/interface/IAddress"
import AddressStore from "@plugins/gymkonnect/state/addresses"
import empty from "@/components/empty.vue"
import Gymkonnect from "@plugins/gymkonnect/classes/clients"

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
	private get mobilePrefix(){ return "+" + AddressStore.MOBILE_PREFIX(this.address.country) + " " }
	private get mask(){
		return {
			mobile: "##### ##### #####",
		}
	}

	@Watch("mobile")
	@Watch("sameAsPhone")
	@Watch("homeSameAsPhone")
	private onSameAsPhoneChange() {
		if (this.sameAsPhone) this.whatsappNumber = this.mobile
		if (this.homeSameAsPhone) this.homeNumber = this.mobile
	}

	private get rules() {
		return {
			mobile: [
				(v: string) => !!v || "Number is required",
				(v: string) => !this.existsMobile || "Mobile Number already registered",
			],
			whatsappNumber: [(v: string) => !!v || " Number is required",],
			homeNumber: [(v: string) => !!v || "Required",],
			emailRules: [
				(v: string) => !!v || "E-mail is required",
				(v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
				// (v: string) => !!v && !this.existsEmail || "E-mail already registered",
			],
			address: {
				house: [(house: string) => !!house || "House Address is required",],
				city: [(city: string) => !!city || "City is required",],
				state: [(state: string) => !!state || "State is required",],
				pincode: [(pincode: string) => !!pincode || "Pincode is required",],
				country: [(country: string) => !!country || "country is required",],
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

	private focused = false
	private focus(isVisible: boolean) {
		if(this.focused) return
		if(isVisible){
			// @ts-ignore
			this.$refs.autofocus.focus()
			this.focused = true
		}
	}

	@Prop({ type: Boolean, default: false }) public saving !: boolean

	private validatingMobile = false
	private validatingEmail = false
	private existsMobile = false
	private existsEmail = false

	@Watch("mobile") private async onMobileChange(){
		if(this.mobile.length > 4){
			this.validatingMobile = true
			this.existsMobile = await Gymkonnect.existsMobile(this.mobile)
			this.validatingMobile = false
		}
	}

	// FIXME: email verification
	// @Watch("email") private async onEmailChange(){
	// 	if(this.email.includes("@")){
	// 		this.validatingEmail = true
	// 		const autoCancelVerificationPromise = new Promise(async (resolve, reject)=> {
	// 			const start  = moment()
	// 			const startS = start.toISOString()
	// 			const email = this.email
	// 			console.log(startS, email)
	// 			const result = await Gymkonnect.existsEmail(email)
	// 			console.log(startS, moment().diff(start), email, this.email, result)
	// 			if(this.email!==email){
	// 				resolve(false)
	// 				return false
	// 			}
	// 			if(result){
	// 				// rinzler.d.vicky@gmail.com
	// 				console.log(true, startS, moment().diff(start), email, this.email, result)
	// 			}
	// 			this.existsEmail = result
	// 			resolve(true)
	// 			return true
	// 		})
	// 		await autoCancelVerificationPromise
	// 		this.validatingEmail = false
	// 	}
	// }
}