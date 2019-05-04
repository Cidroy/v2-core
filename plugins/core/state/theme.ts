import { VuexModule, Module, getModule, MutationAction } from "vuex-module-decorators"
import store from "@plugins/core/state/store"

let _darkTheme: boolean = true

@Module({ dynamic: true, store, name: "theme" })
class Theme extends VuexModule{
	private _darkTheme: boolean = _darkTheme
	public get DARK_THEME(): boolean{ return this._darkTheme }
	@MutationAction({ mutate: [ "_darkTheme", ] }) public async toggleDarkTheme(){
		_darkTheme = !_darkTheme
		return { _darkTheme }
	}
}

export const ThemeStore = getModule(Theme)
