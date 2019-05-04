// TODO: implement fully
import { Component, Vue } from "vue-property-decorator"
import empty from "@/components/empty.vue"
import moment from "moment"

@Component({
	// @ts-ignore
	components: { empty, },
})
export default class CalendarComponent extends Vue.default {
	// #region calendar
	private calendar = moment().toISOString().substr(0, 10)
	private calendarViewMode = this.CalendarViewModeDefault

	private get CalendarViewModes() {
		return [
			{ name: "Month", type: "month", icon: "today" },
			{ name: "Week", type: "week", icon: "view_week" },
			{ name: "Day", type: "day", icon: "view_day" },
		]
	}
	private get CalendarViewModeDefault() { return this.CalendarViewModes[0].type }
	private get calendarViewModeIcon() { return this.CalendarViewModes.find(i => i.type === this.calendarViewMode)!.icon }

	private onDateClicked(param) {
		if (this.calendarViewMode === "month") this.calendarViewMode = "week"
		else if (this.calendarViewMode === "week") this.calendarViewMode = "day"
	}
	private onDayClicked(param) {
		console.log("day", param)
	}
	// #endregion
}
