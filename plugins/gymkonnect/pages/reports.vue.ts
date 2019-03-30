import { Component, Watch, Vue, Prop } from "vue-property-decorator"
import moment from "moment"
import appConfig from "@/app.config"
import Layout from "@/layouts/layout.vue"
import { parseDate, formatDate } from "@/utils/misc"
import { ReportsListStore } from "@plugins/gymkonnect/state/report-list"
import { Logger } from "@classes/CONSOLE"
import { sleep } from "@classes/misc"

const Console = new Logger(`reports.vue/gk`)
const REPORT_TYPES = {
	RENEWAL: {
		name: "Renewal Reports",
		value: "RENEWAL",
		report: "RENEWALS",
		INITIALIZE: "Initialize_GK_R_RENEWALS",
		ITEMS: "GK_R_RENEWALS",
		TABLE_HEADING: "GK_R_TABLE_HEADING_RENEWALS",
		LOADING: "GK_R_LOADING_RENEWALS",
		CONTEXTMENU: "GK_R_contextmenu_RENEWALS",
	},
}

const TODAY = moment()
const TIME_PERIODS = {
	TODAY: {
		name: "Today",
		value: "TODAY",
		start: moment(TODAY),
		end: moment(TODAY),
		custom: false,
	},
	THIS_FY: {
		name: "This Year",
		value: "THIS_FY",
		start: moment(TODAY).set("month", 3).set("date", 1).add(TODAY.month() > 3 ? 0 : -1, "year"),
		end: moment(TODAY),
		custom: false,
	},
	LAST_FY: {
		name: "Last Year",
		value: "LAST_FY",
		start: moment(TODAY).set("month", 3).set("date", 1).add(TODAY.month() > 3 ? -1 : -2, "year"),
		end: moment(TODAY).set("month", 2).set("date", 31).add(TODAY.month() > 3 ? 0 : -1, "year"),
		custom: false,
	},
	THIS_MONTH: {
		name: "This Month",
		value: "THIS_MONTH",
		start: moment(new Date(TODAY.year(), TODAY.month(), 1)),
		end: moment(TODAY),
		custom: false,
	},
	LAST_MONTH: {
		name: "Last Month",
		value: "LAST_MONTH",
		start: moment(new Date(TODAY.year(), TODAY.month() - 1, 1)),
		end: moment(new Date(TODAY.year(), TODAY.month() - 1, 1)).endOf("month"),
		custom: false,
	},
	THIS_QUATER: {
		name: "This Quater",
		value: "THIS_QUATER",
		start: moment(TODAY).startOf("quarter"),
		end: moment(TODAY),
		custom: false,
	},
	LAST_QUATER: {
		name: "Last Quater",
		value: "LAST_QUATER",
		start: moment(TODAY).startOf("quarter").add(-1, "quarter"),
		end: moment(TODAY).endOf("quarter").add(-1, "quarter").endOf("month"),
		custom: false,
	},
	LIFETIME: {
		name: "Lifetime",
		value: "LIFETIME",
		start: moment(new Date(1947, 7, 15)),
		end: moment(TODAY),
		custom: false,
	},
	CUSTOM: {
		name: "Custom",
		value: "CUSTOM",
		start: moment(TODAY),
		end: moment(TODAY),
		custom: true,
	},
}

@Component({
	// @ts-ignore
	components: {
		Layout,
	},
	page: {
		title: "Reports",
		meta: [{ name: "Reports", content: appConfig.description, },],
	},
	created(){
		this.Initialize()
	}
})
// @ts-ignore
export default class ReportsPage extends Vue {
	private get parseDate() { return parseDate }
	private get formatDate() { return formatDate }

	private Initialize(){
		this.report = Object.keys(REPORT_TYPES).includes(this.ReportType) ? this.ReportType : <keyof typeof REPORT_TYPES>this.REPORT_TYPES.RENEWAL.value
		this.timePeriod = Object.keys(TIME_PERIODS).includes(this.TimePeriod) ? this.TimePeriod : <keyof typeof TIME_PERIODS>this.TIME_PERIODS.THIS_MONTH.value
		this.onTimePeriodChange()
		this.refresh()
	}

	private get refreshing() { return ReportsListStore[this.REPORT.LOADING] }
	private async refresh() {
		ReportsListStore[this.REPORT.INITIALIZE]({
			start: this.timePeriodStart,
			end: this.timePeriodEnd,
		})
	}

	// #region tables
	private search = ""

	private report: keyof typeof REPORT_TYPES = "RENEWAL"
	private get REPORT_TYPES() { return REPORT_TYPES }
	private get REPORT(){ return this.REPORT_TYPES[this.report] }

	private timePeriod: keyof typeof TIME_PERIODS = "THIS_MONTH"
	private get TIME_PERIODS(){ return TIME_PERIODS }
	private timePeriodStart = new Date().toISOString().substr(0, 10)
	private timePeriodStartFormatted = this.formatDate(this.timePeriodStart)
	private timePeriodStartMenu = false
	@Watch("timePeriodStart") private onTimePeriodStartChanged() { this.timePeriodStartFormatted = this.formatDate(this.timePeriodStart) }

	private timePeriodEnd = new Date().toISOString().substr(0, 10)
	private timePeriodEndFormatted = this.formatDate(this.timePeriodEnd)
	private timePeriodEndMenu = false
	@Watch("timePeriodEnd") private onTimePeriodEndChanged() { this.timePeriodEndFormatted = this.formatDate(this.timePeriodEnd) }

	private get CustomRange(){ return this.TIME_PERIODS[this.timePeriod].custom }
	@Watch("timePeriod") private onTimePeriodChange(){
		this.timePeriodStart = this.TIME_PERIODS[this.timePeriod].start.endOf("day").toISOString().substr(0,10)
		this.timePeriodEnd = this.TIME_PERIODS[this.timePeriod].end.endOf("day").toISOString().substr(0,10)
	}

	private selected = []
	private tablePagination: Record<string, any> = {}
	private get tableHeaders() { return ReportsListStore[this.REPORT.TABLE_HEADING] }
	private get tableItems() { return ReportsListStore[this.REPORT.ITEMS] }
	private tableToggleAll() {
		if (this.selected.length) this.selected = []
		else this.selected = this.tableItems.slice()
	}
	private tableChangeSort(column: string) {
		if (this.tablePagination.sortBy === column) {
			this.tablePagination.descending = !this.tablePagination.descending
		} else {
			this.tablePagination.sortBy = column
			this.tablePagination.descending = false
		}
	}

	private showMemberContextMenu = false
	private memberContextMenuSelection: string | number = -1
	private memberContextMenuPoint: Point = { x: 0, y: 0 }
	private get memberContextMenu() {
		return ReportsListStore[this.REPORT.CONTEXTMENU](
			(<Array<any>>this.tableItems||[]).find(i => i.id === this.memberContextMenuSelection) || null
		)
	}
	private memberContextMenuClicked(e: MouseEvent, id: string | number) {
		e.preventDefault()
		this.showMemberContextMenu = false
		this.memberContextMenuSelection = id
		this.memberContextMenuPoint.x = e.clientX
		this.memberContextMenuPoint.y = e.clientY
		// @ts-ignore
		this.$nextTick(() => { this.showMemberContextMenu = true })
	}

	// #endregion

	// #region props
	@Prop({ type: String, default: REPORT_TYPES.RENEWAL.value }) public ReportType !: keyof typeof REPORT_TYPES
	@Prop({ type: String, default: TIME_PERIODS.THIS_MONTH.value }) public TimePeriod !: keyof typeof TIME_PERIODS
	// #endregion
}