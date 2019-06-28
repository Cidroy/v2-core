import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import Layout from "@plugins/core/layouts/layout.vue"
import SpaBooking from "@plugins/gymkonnect/components/bookings/spa-booking.vue"
import GroundBooking from "@plugins/gymkonnect/components/bookings/ground-booking.vue"
import { formatDate, parseDate } from "@plugins/core/utils/misc"
import moment from "moment"

// @ts-ignore
type TSessions = Record<string, {
	date: string,
	dateFormatted: string,
	time: string,
	// tslint:disable-next-line: semicolon
}>;
// @ts-ignore
@Component({
	components: {
		Layout,
		SpaBooking,
		GroundBooking,
	},
})
export default class BookingPage extends Vue.default {
	private printingBlank = false
	private printBlank(){
		// TODO:
	}

	// TODO: [Karthik] Icons
	private get BookingTypes(): Record<string, { name: string, slug: string, icon?: string }> {
		return {
			SPA: { name: "Spa", slug: "spa-booking", icon: "apps" },
			GROUND: { name: "Ground", slug: "ground-booking", icon: "apps" },
		}
	}

	private bookingTab = Object.values(this.BookingTypes)[0].slug

	private formatDate(date: string) { return formatDate(date) }
	private doj = new Date().toISOString().substr(0, 10)
	private dojFormatted = this.formatDate(this.doj)
	private dojMenu = false
	@Watch("doj") private onDateChanged() { this.dojFormatted = this.formatDate(this.doj) }
	private get _minDoj() { return this.allowBackDating ? new Date(1947, 7, 16) : this.dojRange.start }
	private get minDoj() { return moment(this._minDoj).toISOString().substr(0, 10) }
	private allowBackDating = false
	private get _maxDoj() { return this.dojRange.end }
	private get maxDoj() { return this.dojRange.end ? moment(this._maxDoj).toISOString().substr(0, 10) : undefined }
	private get getDateFormatted() { return this.formatDate(this.doj) }

	@Prop({ type: Object, default: () => ({ start: new Date(), end: undefined }) }) public dojRange !: { start: Date, end?: Date }


	private sessions: TSessions = {}
	private timeMenu = false
	private timeIndex = ""
	private time = "06:00"
	private showTimePicker(key: string) {
		this.timeIndex = key
		this.time = this.sessions[key].time
		this.timeMenu = true
	}
	private saveTime() { this.sessions[this.timeIndex].time = this.time }
}
