import { Component, Vue } from "vue-property-decorator"
import MemberListPage from "./member/list.vue"

@Component({
	// @ts-ignore
	components: {
		MemberListPage,
	},
	page: {
		title: "Gym Dashboard",
		meta: [{ name: "Dashboard", content: "", },],
	},
})
export default class GymDashboard extends Vue.default { }
