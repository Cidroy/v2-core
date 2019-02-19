import { Component, Vue, Watch } from "vue-property-decorator"
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import stepOne from "@/components/m-registration/step-1.vue"

@Component({
	// @ts-ignore
	components: {
		Layout,
		stepOne,
	},
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},
})
// @ts-ignore
export default class Home extends Vue {

	private userData = {
		firstName: "",
		middleName: "",
		lastName: "",
	}

	private valid: boolean = false
	private importDialog = false
	private checkbox = []
	private search = ""
	private selected = null
	private CBTypeMem = null
	private CBMemDuration = null
	private firstname = ""
	private email = ""
	private phone = ""
	private phoneRules = [
		v => !!v || "Number is required",
		v => v.length <= 10,
	]

	private emailRules = [
		v => (v || "").match(/@/) || "Please enter a valid email",
	]
	private nameRules = [
		v => !!v || "Name is required",
		v => v.length <= 30 || "Name must be less than 30 characters",
	]
	private row = null
	private e1 = 0
	private date = new Date().toISOString().substr(0, 10)
	private dateFormatted = this.formatDate(this.date)
	private radioGroup1 = "radio-1"
	private radioGroup2 = "radio-4"
	private menu1 = false
	private menu4 = false
	private select = []
	private purposes = [
		"General Fitness",
		"Lose Fat",
		"Gain Muscle",
		"Tone Up",
		"Sports Oriented",
		"Lifestyle",
		"Transform",
		"Specialized Training",
	]
	private loader = null
	private radios = "radio-7"
	private test = "Monthly"
	private loading = false
	private dialog = false

	private items = [
		"Programming",
		"Design",
		"Vue",
		"Vuetify",
	]
	private Category = [
		"student",
		"Senior Citizen",
		"Professionals",
		"Buisness Man",
	]
	private idProof = [
		"Aadhaar Card",
		"Passport",
		"License",
		"Pan Card",
	]
	private bodyType = [
		"endomorph",
		"ectomorph",
		"mesomorph",
	]
	private cards = [
		{ src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg", flex: 10 },
	]

	@Watch("date")
	private onDateChanged() {
		this.dateFormatted = this.formatDate(this.date)
	}

	@Watch("select")
	private onSelectMax(val) {
		if (val.length > 3) {
			// @ts-ignore
			this.$nextTick(() => this.select.pop())
		}
	}

	private get getDateFormatted() {
		return this.formatDate(this.date)
	}

	private formatDate(date) {
		// if (!date) return null
		const [year, month, day,] = date.split("-")
		return `${day}/${month}/${year}`
	}
	private parseDate(date) {
		if (!date) return null
		const [day, month, year,] = date.split("/")
		return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
	}
}