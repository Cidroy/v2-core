import moment from "moment"
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import { Component, Vue, Watch } from "vue-property-decorator"

@Component({
	// @ts-ignore
	components: {
		Layout,
	},
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},
	created() {
		this.endDate = this.minEndDate
	},
})
// @ts-ignore
export default class MemberFreezePage extends Vue {
	private freeze1 = false
	private freeze2 = false
	private minPeriod = 5
	private startDate = new Date().toISOString().substr(0, 10)
	private minStartDate = new Date().toISOString().substr(0, 10)
	private startDateFormatted = this.formatDate(this.startDate)
	private endDate = new Date().toISOString().substr(0, 10)
	private endDateFormatted = this.formatDate(this.endDate)
	private snackbar = false
	private y = "top"
	private x = "right"
	private mode = ""
	private timeout = 6000
	private freezingPeriod = []

	private get period() {
		let a = moment(this.endDate)
		let b = moment(this.startDate)
		return a.diff(b, "days")
	}

	private get minEndDate() {
		return moment(this.startDate).add(this.minPeriod + 1, "days").toISOString().substr(0, 10)
	}

	@Watch("minEndDate")
	private onMinEndDateChanged(newVal, oldVal) {
		this.endDate = moment.max(moment(this.endDate), moment(newVal)).add(1, "days").toISOString().substr(0, 10)
	}

	@Watch("minStartDate")
	private onMinStartDateChanged(newVal, oldVal) {
		this.startDate = moment.max(moment(this.startDate), moment(newVal)).add(1, "days").toISOString().substr(0, 10)
	}

	@Watch("startDate")
	private onStartDateChanged() {
		this.startDateFormatted = this.formatDate(this.startDate)
	}

	@Watch("endDate")
	private onEndDateChanged() {
		this.endDateFormatted = this.formatDate(this.endDate)
	}

	private get getStartDateFormatted() {
		return this.formatDate(this.startDate)
	}
	private get getEndDateFormatted() {
		return this.formatDate(this.endDate)
	}

	// FIXME: use from utils!
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
