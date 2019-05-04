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
export default class HelpPage extends Vue.default { }
