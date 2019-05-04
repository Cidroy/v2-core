import appConfig from "@/app.config"
import { Component, Vue } from "vue-property-decorator"
import Keyboard from "mousetrap"
import devResizer from "@/components/dev-resizer.vue"
import { ThemeStore } from "@plugins/core/state/theme"
import { Logger } from "@classes/CONSOLE"
import { ApplicationStore } from "@plugins/core/state/application"
import loading from "@plugins/core/pages/loading.vue"

const Console = new Logger(`gk-vue/${__filename}`)
@Component({
	// @ts-ignore
	components: {
		devResizer,
		loading,
	},
	page: {
		// All subcomponent titles will be injected into this template.
		titleTemplate(title) {
			// @ts-ignore
			title = typeof title === "function" ? title(this.$store) : title
			return title ? `${title} | ${appConfig.title}` : appConfig.title
		},
	},
	beforeCreate() {
		Keyboard.bind(["command+p", "ctrl+p",], () => {
			this.showDevResizer = !this.showDevResizer
		})
		try {
		} catch (error) {
			Console.error(error)
		}
	},
})
export default class App extends Vue.default {
	private showDevResizer = false

	private get darkTheme(){ return ThemeStore.DARK_THEME }
	private get layout(){ return ApplicationStore.APP_LAYOUT }
	private get appRouterLoading(){ return ApplicationStore.APP_ROUTER_LOADING }
}
