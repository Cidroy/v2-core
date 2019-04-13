import { Component, Vue, Watch } from "vue-property-decorator"
import empty from "@/components/empty.vue"
import { ThemeStore } from "@/state/theme"
import { ProfilePanelStore } from "../state/profile-panel"
import { Permissions } from "../permission"
import { Permission } from "@classes/Permission"

@Component({
	// @ts-ignore
	components: { empty, },
	beforeCreate(){
		if (Permission(Permissions.PROFILE_VIEW))
		ProfilePanelStore.addProfilePanelAction({
			text: "My Account",
			// FIXME: Add Actions for my account
			action: () => { },
			icon: "fa-user-circle",
			iconClass: "fas"
		})
	}
})
export default class ProfilePanel extends Vue.default {
	private profileMenu = false

	private get profileList(){ return ProfilePanelStore.PROFILE_PANEL_LIST }

	private get iconText(){ return this.user.name? this.user.name.charAt(0).toUpperCase() : null }
	private get user(){ return ProfilePanelStore.PROFILE_PANEL_USER }

	private darkTheme = ThemeStore.DARK_THEME
	@Watch("darkTheme") private toggleDarkTheme() { ThemeStore.toggleDarkTheme() }
}