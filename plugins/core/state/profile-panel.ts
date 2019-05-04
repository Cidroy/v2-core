import { VuexModule, Module, getModule, MutationAction } from "vuex-module-decorators"
import store from "@plugins/core/state/store"
import { TProfilePanelAction } from "../classes/types/misc"
import { logout, exit } from "../classes/actions"
import { UserStore } from "@plugins/core/state/user"

let profilePanelList: TProfilePanelAction[] = [
	{ text: "Logout", action: logout, icon: "fa-sign-out-alt", iconClass: "fas" },
	{ text: "Exit", action: exit, icon: "fa-times", iconClass: "fas" },
]

@Module({ dynamic: true, store, name: "ProfilePanel" })
class ProfilePanel extends VuexModule {
	private profilePanelList = profilePanelList
	public get PROFILE_PANEL_LIST() { return this.profilePanelList }

	@MutationAction({ mutate: ["profilePanelList",] }) public async addProfilePanelAction(profileAction: TProfilePanelAction) {
		profilePanelList = [ profileAction, ...profilePanelList, ]
		return { profilePanelList }
	}

	public get PROFILE_PANEL_USER() {
		return {
			name: UserStore.USER ? UserStore.USER.name: "Guest",
			type: UserStore.USER ? UserStore.USER.userType: "Guest"
		}
	}

}

export const ProfilePanelStore = getModule(ProfilePanel)
