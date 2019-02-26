import Layout from "@/layouts/main.vue"
import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator"
import { MiscStore } from "@plugins/gymkonnect/state/misc"
import { GENDER } from "@classes/enum/misc"
@Component({
	//   @ts-ignore
	components: {
		Layout,
	},
	created() {
		this.onValueChange()
	}
})
//   @ts-ignore
export default class Spa extends Vue {
	private firstName = ""
	private middleName = ""
	private lastName = ""
	private address = ""
	private whatsappNumber = ""

	@Watch("userData") private onUserDataChange(newVal) { console.log(newVal) }
	private get GROUPINGS_layout() { return MiscStore.GROUPINGS }

	private gender: GENDER = GENDER.MALE
	private get GENDERS() { return GENDER }
	private occupation = MiscStore.OCCUPATIONS[0]
	private get Occupations() { return MiscStore.OCCUPATIONS }

	private get spaPlan() { return MiscStore.SPA_PLAN[0] }

	private get rules() {
		return {
			firstName: [v => !!v || "First Name is required",],
			idNumber: [v => !!v || "ID Number is required",],
			address: [address => !!address || "This field is required",],
			phone: [v => !!v || "Phone number is required",]
		}
	}

	private get userData() {
		return {
			...this.value,
			firstName: this.firstName,
			middleName: this.middleName,
			lastName: this.lastName,
			address: this.address,
			whatsappNumber: this.whatsappNumber
		}
	}
	@Prop({
		type: Object, default: () => ({
			firstName: "",
			middleName: "",
			lastName: "",
			address: "",
			whatsappNumber: ""
		})
	}) private value !: {
		firstName: string,
		middleName: string,
		lastName: string,
		address: string,
		whatsappNumber: string
	}
	@Emit("input") public inputEmitter() { return this.userData }
	@Watch("value") private onValueChange() {
		this.firstName = this.value.firstName
		this.middleName = this.value.middleName
		this.lastName = this.value.lastName
		this.address = this.value.address
		this.whatsappNumber = this.value.whatsappNumber
	}

//  	@Prop({ type: Boolean, default: false }) showDelete !: boolean
//  	@Emit("deleteStepper") deleteLayout(){ return true }

//  	formValid: boolean = true
//  	formReset(){
//  		// @ts-ignore
//  		this.$refs.form.reset()
//  	}

//  	Submit(){
//  		 //@ts-ignore
//  		if(this.$refs.form.validate()){
//  			this.inputEmitter()
//  			this.
//  		}
//  	}

//  	@Emit("") (){ return true }
//  	@Emit("cancel") cancel(){ return true }

}