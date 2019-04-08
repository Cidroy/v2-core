import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import { GENDER } from "@classes/enum/misc"
import { parseDate, formatDate } from "@/utils/misc"
import { GymkonnectStore } from "@plugins/gymkonnect/state/gymkonnect"
import importFromEnquiry from "@plugins/gymkonnect/components/enquiry/import-dialog.vue"
import { TMRegistrationStep1, defaultRegistrationStep1User } from "@plugins/gymkonnect/classes/types/registration"
import addUserPhoto from "@plugins/gymkonnect/components/add-user-photo.vue"

import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`step-1.vue/registration/gk`)
@Component({
	// @ts-ignore
	components: {
		importFromEnquiry,
		addUserPhoto,
	},
	created() {
		this.onValueChange()
	}
})
// @ts-ignore
export default class MRegistrationStep1 extends Vue {

	private parseDate(date) { return parseDate(date) }
	private formatDate(date) { return formatDate(date) }

	private loading = false

	private firstName = ""
	private middleName = ""
	private lastName = ""
	private photo = ""

	private gender: GENDER = GENDER.MALE
	private get GENDERS() { return GENDER }

	private dob = new Date().toISOString().substr(0, 10)
	private dobFormatted = this.formatDate(this.dob)
	private dobMenu = false
	@Watch("dob") private onDobChanged() { this.dobFormatted = this.formatDate(this.dob) }

	private occupation: string | number = (GymkonnectStore.GK_OCCUPATIONS[0] || { id: 0 }).id
	private get Occupations() { return GymkonnectStore.GK_OCCUPATIONS }

	private idType: string | number = (GymkonnectStore.GK_ID_TYPES[0] || { id: 0 }).id
	private idNumber: string = ""
	private get IDTypes() { return GymkonnectStore.GK_ID_TYPES }

	private get rules() {
		return {
			firstName: [v => !!v || "First Name is required",],
			idNumber: [v => !!v || "ID Number is required",],
			memberId: [v => v!==0 || "Please generate badgenumber",],
		}
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

	private badgenumber?: string | number = undefined

	private get userData(): TMRegistrationStep1 {
		return {
			...this.value,
			firstName: this.firstName,
			middleName: this.middleName,
			lastName: this.lastName,
			photo: this.photo,
			gender: this.gender,
			dob: this.dob,
			occupation: this.occupation,
			idType: this.idType,
			idNumber: this.idNumber,
			badgenumber: this.badgenumber,
		}
	}
	@Prop({
		type: Object,
		default: () => defaultRegistrationStep1User
	}) private value !: TMRegistrationStep1
	@Emit("input") public inputEmitter() { return this.userData }
	@Watch("value") private onValueChange() {
		this.firstName = this.value.firstName
		this.middleName = this.value.middleName
		this.lastName = this.value.lastName
		this.gender = this.value.gender
		this.dob = this.value.dob
		this.photo = this.value.photo
		this.occupation = this.value.occupation
		this.idType = this.value.idType
		this.idNumber = this.value.idNumber
		this.badgenumber = this.value.badgenumber
	}

	@Prop({ type: Boolean, default: false }) public allowImportFromEnquiry !: boolean
	@Prop({ type: Boolean, default: false }) public Readonly !: boolean

	private autoGenerateMemberId = true

	private async generateMemberId() {
		// TODO: [Vicky] unlock badge if not used
		// maybe make a store to lock session wide and unlock before exit/logout
		if(this.exclude.includes("badgenumber")) return
		this.loading = true
		try {
			this.badgenumber = (await Gymkonnect.generateBadgenumber())[0]
			Console.verbose("generated badgenumber",this.badgenumber)
		} catch (e) { Console.error(e) }
		this.loading = false
	}

	@Prop({ type: Boolean, default: false }) public saving !: boolean
	@Prop({ type: Array, default: () => ([]) }) public exclude !: string[]
}
