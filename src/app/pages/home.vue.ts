import { Component, Vue, Watch } from "vue-property-decorator"
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import { TestStore } from "@plugins/gymkonnect/state/test"
import systemInformation from "@/components/system-information.vue"

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
	private test_1() { TestStore.test_1() }
	private test_2() { TestStore.test_2() }
}
