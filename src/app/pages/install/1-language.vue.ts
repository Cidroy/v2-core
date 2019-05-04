import { Component, Watch, Vue } from "vue-property-decorator"
import { i18n, ILanguage } from "@/i18n"
import { InstallerStore } from "@/state/install-modules/install"
import { MAIN } from "@plugins/core/classes/setup"
import { TStageProductKey, TStageLanguage } from "@plugins/core/classes/install-router"

@Component({
	// @ts-ignore
	components: {},
	page: {
		title: "Install Gym-Konnect",
		meta: [{ name: "Install", content: "Install Gymkonnect now", },],
	},
})
export default class LanguagePage extends Vue.default {
	private i18n = i18n
	private language: ILanguage = i18n.default
	@Watch("language")
	private onLanguageChange() {
		InstallerStore.setLanguage(this.language)
	}
	private next() {
		MAIN.next({ language: this.language, })
	}
	constructor() {
		super()
		InstallerStore.setInstallPageTitle("install.steps.select_language")
	}
}
