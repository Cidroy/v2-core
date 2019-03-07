import appConfig from "@/app.config"
import Layout from "@/layouts/layout.vue"
import { parseDate, formatDate } from "@/utils/misc"
import { Component, Watch, Vue } from "vue-property-decorator"

@Component({
	// @ts-ignore
	components: {
		Layout,
	},
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},

})
// @ts-ignore
export default class Home extends Vue {
	private parseDate(date) { return parseDate(date) }
	private formatDate(date) { return formatDate(date) }

	private date = new Date().toISOString().substr(0, 10)
	private dateFormatted = this.formatDate(this.date)

	@Watch("date")
	private onDateChanged() {
		this.dateFormatted = this.formatDate(this.date)
	}

	private get getDateFormatted() {
		return this.formatDate(this.date)
	}

	private menu1 = false
	private menu = false
	private Type = ""
	private ReportType = [
		"abcd",
		"asdf",
		"qwerty",
		"zxcvb",
		"fghjhj",
	]

}