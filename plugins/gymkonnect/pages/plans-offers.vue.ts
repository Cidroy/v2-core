import appConfig from "@/app.config"
import Layout from "@plugins/core/layouts/layout.vue"
import { Component, Vue } from "vue-property-decorator"

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
export default class Home extends Vue.default {

	private open = []
	private active = []
	private users: any[] = []

	private get selected() {
		if (!this.active.length) return undefined

		const id = this.active[0]

		return this.users.find(user => user.id === id)
	}

	private tree = []
	private items = [
		{
			name: ".git"
		},
		{
			name: "node_modules"
		},
		{
			name: ".gitignore",
			file: "txt"
		},
		{
			name: "babel.config.js",
			file: "js"
		},
		{
			name: "README.md",
			file: "md"
		},

	]

}
