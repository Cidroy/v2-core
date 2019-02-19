import { Component, Vue, Watch } from "vue-property-decorator"
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import personalTraining from "@/components/registration/personalTraining.vue"
import oneDay from "@/components/registration/oneDay.vue"

@Component({
	// @ts-ignore
	components: {
		Layout,
		personalTraining,
		oneDay
	},
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},
})
// @ts-ignore
export default class Home extends Vue {
	private date = new Date().toISOString().substr(0, 10)
	private dateFormatted = this.formatDate(this.date)
	private time4 = null
	private time5 = null
	private time = null
	private modal5 = false
	private menu2 = false
	private menu3 = false
	private menu1 = false
	private ODstart = false
	private ODend = false
	private active = 0
	private radioTop1 = "radio-1"
	private radioTop2 = "radio-1"
	private radios1 = "radio-1"
	private radios2 = "radio-1"
	private radioTime = "radio-1"
	private radioOneDay = "radio-1"
	private Counsellor = "radio-1"
	private radioGroup1 = "radio-4"
	private firstname = ""
	private nameRules = [
		(v: string) => !!v || "Name is required",
		(v: string) => v.length <= 15 || "Name must be less than 15 characters",
	]
	private items = [
		"Programming",
		"Design",
		"Vue",
		"Vuetify",
	]
	private dates = ["2018-09-15", "2018-09-20",]
	private email = ""
	private emailRules = [
		(v: string) => (v || "").match(/@/) || "Please enter a valid email",
	]
	private snackbar1 = false
	private snackbar2 = false
	private snackbar3 = false
	private y = "top"
	private mode = ""
	private timeout = 6000
	private tabsList = {
		a: "Personal Training",
		b: "One Day",
		c: "Fitness conseling",
	}
	private next() {
		const active = parseInt(this.active.toString())
		this.active = (active < 2 ? active + 1 : 0)
	}

	@Watch("date")
	private onDateChanged() {
		this.dateFormatted = this.formatDate(this.date)
	}

	private get getDateFormatted() {
		return this.formatDate(this.date)
	}

	private formatDate(date) {
		// if (!date) return null
		const [year, month, day,] = date.split("-")
		return `${day}/${month}/${year}`
	}

	private get computedDateFormatted() {
		return this.formatDate(this.date)
	}

	private parseDate(date) {
		if (!date) return null
		const [day, month, year,] = date.split("/")
		return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
	}

}
