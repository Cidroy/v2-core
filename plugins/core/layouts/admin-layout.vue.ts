import { Component, Vue } from "vue-property-decorator"
import { ApplicationStore } from "@plugins/core/state/application"
import { Permissions } from "@plugins/core/permission"

import logo from "@/assets/images/logo-dark.png"
import navDrawerBG from "@plugins/core/assets/nav-drawer-bg.jpg"

import NotificationPanel from "@plugins/core/components/notifications.vue"
import ProfilePanel from "@plugins/core/components/profile-panel.vue"
import NavbarSearch from "@plugins/core/components/navbar-search.vue"
import AppFooter from "@plugins/core/components/footer.vue"

// @ts-ignore
@Component({
	components: {
		NotificationPanel,
		ProfilePanel,
		NavbarSearch,
		AppFooter,
	},
})
export default class AddAdminLayout extends Vue.default {
	private logo = logo
	private navDrawerBG = navDrawerBG
	private get PERMISSIONS() {
		return {
			maple: Permissions
		}
	}

	private menuDrawer = true
	private get menus(){ return ApplicationStore.APP_MENUS }

	private get appName(){ return ApplicationStore.APP_NAME }
}
