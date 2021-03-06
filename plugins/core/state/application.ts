import { VuexModule, Module, getModule, MutationAction, Action } from "vuex-module-decorators"
import store from "@plugins/core/state/store"
import { TMenu } from "@classes/types/application"
import _ from "lodash"
import { Permissions } from "@plugins/core/permission"
import { UserStore } from "./user"

let appMenu: TMenu[] = []
let appSettingsMenu: TMenu[] = []
let appRouterLoading = false

@Module({ dynamic: true, store, name: "Application" })
class Application extends VuexModule {
	private appMenu = appMenu
	private appSettingsMenu = appSettingsMenu
	private appRouterLoading = appRouterLoading

	public get APP_ROUTER_LOADING() { return this.appRouterLoading }
	@MutationAction({ mutate: [ "appRouterLoading", ] }) public async setAppRouterLoading(payload: boolean) {
		appRouterLoading = payload
		return { appRouterLoading }
	}

	public get APP_MENUS() {
		return [
			...this.appMenu,
			{
				name: "core/settings",
				icon: "settings",
				text: "Settings",
				children: this.appSettingsMenu,
				"icon-alt": "settings",
				model: false,
				permission: Permissions.ADMIN_SETTINGS,
			},
		]
	}
	@MutationAction({ mutate: ["appMenu",] }) public async addAppMenu(menu: TMenu) {
		appMenu.push(menu)
		return { appMenu }
	}

	@MutationAction({ mutate: [ "appSettingsMenu", ] }) public async addAppMenuToSettings(menu: TMenu | TMenu[]) {
		if (_(menu).isArray()) appSettingsMenu = [...appSettingsMenu, ...<TMenu[]>menu, ]
		else appSettingsMenu.push(<TMenu>menu)
		return { appSettingsMenu }
	}

	@MutationAction({ mutate: [ "appMenu", ] }) private async mutateAppMenu(payload) {
		appMenu = payload
		return { appMenu }
	}

	@Action({ }) public async InitializeAppMenu() {
		const menus = require("@classes/core/menus").default
		appMenu = [
			{ icon: "dashboard", text: "Dashboard", to: "index", permission: Permissions.DASHBOARD_VIEW },
			...menus,
		]
		this.mutateAppMenu(appMenu)
		return appMenu
	}

	public get APP_NAME() { return "GYM KONNECT" }
	public get APP_LAYOUT() {
		return UserStore.USER_LOGGEDIN?
			"app-admin-layout"
			:"app-empty-layout"
	}
}

export const ApplicationStore = getModule(Application)
