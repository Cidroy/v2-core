import { Component, Vue, Watch } from "vue-property-decorator"
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import { TestStore } from "@plugins/gymkonnect/state/test"
import systemInformation from "@/components/system-information.vue"
import { NotificationStore } from "@plugins/1-core/state/notifications"
import uuid from "uuid"

@Component({
	// @ts-ignore
	components: {
		Layout,
		systemInformation,
	},
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},
})
// @ts-ignore
export default class Home extends Vue {
	private async test() { console.log("done") }
	private test_1() { NotificationStore.newNotification({
		time: new Date(),
		seen: false,
		title: uuid(),
		subtitle: "octavious"
	}) }
	private test_2() { TestStore.test_2() }
}
