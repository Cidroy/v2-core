import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import { GENDER } from "@classes/enum/misc"
import { parseDate, formatDate } from "@/utils/misc"
import { MiscStore } from "@plugins/gymkonnect/state/misc"
import importFromEnquiry from "@plugins/gymkonnect/components/enquiry/import-dialog.vue"
import { TMRegistrationStep1, defaultRegistrationStep1User } from "@plugins/gymkonnect/classes/types/registration"
import addUserPhoto from "@plugins/gymkonnect/components/add-user-photo.vue"

import Gymkonnect from "@plugins/gymkonnect/classes/clients"

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
	private dobMenu = true
	@Watch("dob") private onDobChanged() { this.dobFormatted = this.formatDate(this.dob) }

	private occupation: string | number = MiscStore.OCCUPATIONS[0].id
	private get Occupations() { return MiscStore.OCCUPATIONS }

	private idType: string | number = MiscStore.ID_TYPES[0].id
	private idNumber: string = ""
	private get IDTypes() { return MiscStore.ID_TYPES }

	private get rules() {
		return {
			firstName: [v => !!v || "First Name is required",],
			idNumber: [v => !!v || "ID Number is required",],
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

	private badgenumber: string | number = 1

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

	private async generateMemberId() {
		this.loading = true
		try {
			this.badgenumber = (await Gymkonnect.generateBadgenumber())[0]
			console.log(this.badgenumber)
		} catch (e) { console.log(e) }
		this.loading = false
	}

	@Prop({ type: Boolean, default: false }) public saving !: boolean
}
