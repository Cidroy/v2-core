import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
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
	private show3: boolean = false
	private dialog = false
	private email = ""
	private username = ""
	private password = ""
	private passRules = [
		(v: string) => !!v || "Required.",
		(v: string) => v.length >= 8 || "Min 8 characters",
	]
	private emailRules = [
		(v: string) => (v || "").match(/@/) || "Please enter a valid email",
	]
	private cards = [
		{ src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg", flex: 6 },
	]

	private show: boolean = true
}