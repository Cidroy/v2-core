import { Component, Vue } from "vue-property-decorator"
import appConfig from "@/app.config"
import GymDashboard from "@plugins/gymkonnect/pages/dashboard.vue"

@Component({
	// @ts-ignore
	components: {
		GymDashboard,
	},
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},
})
// @ts-ignore
export default class HomePage extends Vue { }
