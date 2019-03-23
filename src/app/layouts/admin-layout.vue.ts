import { Component, Vue } from "vue-property-decorator"
import { ApplicationStore } from "@/state/application"
import { Permissions } from "@plugins/core/permission"

import logo from "@/assets/images/logo-dark.png"

import NotificationPanel from "@plugins/core/components/notifications.vue"
import ProfilePanel from "@plugins/core/components/profile-panel.vue"
import NavbarSearch from "@plugins/core/components/navbar-search.vue"
import AppFooter from "@plugins/core/components/footer.vue"

@Component({
	// @ts-ignore
	components: {
		NotificationPanel,
		ProfilePanel,
		NavbarSearch,
		AppFooter,
	},
})
// @ts-ignore
export default class AddAdminLayout extends Vue {
	private logo = logo
	private get PERMISSIONS() {
		return {
			maple: Permissions
		}
	}

	private menuDrawer = true
	private get menus(){ return ApplicationStore.APP_MENUS }

	private get appName(){ return ApplicationStore.APP_NAME }
}