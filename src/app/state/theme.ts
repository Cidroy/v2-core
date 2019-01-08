import { VuexModule, Module, getModule, MutationAction } from "vuex-module-decorators"
import store from "@/state/store"

@Module({ dynamic: true, store, name: "theme" })
class Theme extends VuexModule{
	private _darkTheme: boolean = true
	public get DARK_THEME(): boolean{ return this._darkTheme }
	@MutationAction({ mutate: [ "_darkTheme", ] }) public async toggleDarkTheme(){
		return { _darkTheme : !this._darkTheme }
	}
}

export const ThemeStore = getModule(Theme)