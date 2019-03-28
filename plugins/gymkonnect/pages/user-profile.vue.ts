import { Component, Watch, Vue } from "vue-property-decorator"
import appConfig from "@/app.config"
import Layout from "@/layouts/layout.vue"

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
export default class testuserprofile extends Vue {
	private active = 0
	private tabsList = {
		e: "Overview",
		a: "Activities",
		b: "Transaction",
		c: "Membership",
		d: "Details",
	}
	private profileList: { icon?: string, text: string }[] = [
		{ text: "Name: Kundan Singh", },
		{ text: "Status:", },
		{ text: "Phone:", },
		{ text: "Email: kundan785@gmail.com", },
	]
	private cards = [
		{ src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg", flex: 6 },
	]
}
