import { Component, Vue, Emit, Prop } from "vue-property-decorator"
import { GENDER } from "@plugins/core/enum/misc"
import { parseDate, formatDate } from "@plugins/core/utils/misc"
import { TMRegistration, defaultRegistrationUser } from "@plugins/gymkonnect/classes/types/registration"
import addUserPhoto from "@plugins/gymkonnect/components/add-user-photo.vue"

// @ts-ignore
@Component({
	components: { addUserPhoto },
})
export default class MRegistrationStepFinished extends Vue.default {

	private parseDate(date){ return parseDate(date) }
	private formatDate(date){ return formatDate(date) }

	private get firstName(){ return this.value.firstName }
	private get middleName(){ return this.value.middleName }
	private get lastName(){ return this.value.lastName }
	private get fullName(){
		return `${this.firstName || ""} ${this.middleName || ""} ${this.lastName || ""}`
		.replace(/\s+/," ")
		.trimRight()
	}
	private get dob(){ return this.value.dob }
	private get dobFormattedDate() { return this.formatDate(this.dob) }
	private get mobile(){ return this.value.mobile }
	private get whatsappNumber(){ return this.value.whatsappNumber }
	private get photo(){ return this.value.photo }
	private get email(){ return this.value.email }
	private get badgenumber(){ return this.value.badgenumber }

	private get gender(){ return this.value.gender }
	private get GENDERS(){ return GENDER }

	@Prop({ type: Object, default: () => defaultRegistrationUser }) public value !: TMRegistration
	@Emit("input") public inputEmitter(){ return this.value }

}
