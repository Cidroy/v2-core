import { Component, Vue } from "vue-property-decorator"
import Layout from "@/layouts/layout.vue"
import SpaBooking from "../components/bookings/spa-booking.vue"

// @ts-ignore
@Component({
	components: {
		Layout,
		SpaBooking,
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
}
