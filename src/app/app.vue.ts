import appConfig from "@/app.config"
import { Component, Vue } from "vue-property-decorator"
import Keyboard from "mousetrap"
import devResizer from "@/components/dev-resizer.vue"
import { ThemeStore } from "@/state/theme"
import { MiscStore } from "@plugins/gymkonnect/state/misc"
import { Logger } from "@classes/CONSOLE"
import { ApplicationStore } from "@/state/application"

const Console = new Logger(`gk-vue/${__filename}`)
@Component({
	// @ts-ignore
	components: {
		devResizer,
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
			MiscStore.Initialize()
			ApplicationStore.InitializeAppMenu()
		} catch (error) {
			Console.error(error)
		}
	},
})
// @ts-ignore
export default class App extends Vue {
	private showDevResizer = false

	private get darkTheme(){ return ThemeStore.DARK_THEME }
	private get layout(){ return ApplicationStore.APP_LAYOUT }
}
