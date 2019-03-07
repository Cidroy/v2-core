import { Component, Vue } from "vue-property-decorator"
import appConfig from "@/app.config"
import Layout from "@/layouts/layout.vue"

@Component({
	// @ts-ignore
	components: { Layout, },
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},
})
// @ts-ignore
export default class Home extends Vue {
	private firstname = ""
	private phone = ""
	private email = ""
	private radioGroup2 = "radio-4"
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
	private nameRules = [
		(v: string) => !!v || "Name is required",
		(v: string) => v.length <= 30 || "Name must be less than 30 characters",
	]
	private items = [
		"Programming",
		"Design",
		"Vue",
		"Vuetify",
	]
	private phoneRules = [
		(v: string) => !!v || "Number is required",
	]
	private emailRules = [
		(v: string) => (v || "").match(/@/) || "Please enter a valid email",
	]

}
