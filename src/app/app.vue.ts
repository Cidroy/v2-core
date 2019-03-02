import appConfig from "@/app.config"
import { Component, Watch, Vue } from "vue-property-decorator"
import Keyboard from "mousetrap"
import devResizer from "@/components/dev-resizer.vue"
import { ThemeStore } from "@/state/theme"
import { MiscStore } from "@plugins/gymkonnect/state/misc"
import { Logger } from "@classes/CONSOLE"
import { Permissions } from "@plugins/1-core/permission"

import NotificationPanel from "@plugins/1-core/components/notifications.vue"
import ProfilePanel from "@plugins/1-core/components/profile-panel.vue"
import NavbarSearch from "@plugins/1-core/components/navbar-search.vue"

const Console = new Logger(`gk-vue/${__filename}`)
@Component({
	// @ts-ignore
	components: {
		devResizer,
		NotificationPanel,
		ProfilePanel,
		NavbarSearch,
	},
	page: {
		// All subcomponent titles will be injected into this template.
		titleTemplate(title) {
			// @ts-ignore
			title = typeof title === "function" ? title(this.$store) : title
			return title ? `${title} | ${appConfig.title}` : appConfig.title
		},
	},
	created() {
		Keyboard.bind(["command+p", "ctrl+p",], () => {
			// @ts-ignore
			this.showDevResizer = !this.showDevResizer
		})
		try {
			MiscStore.Initialize()
		} catch (error) {
			Console.error(error)
		}
	},
})
// @ts-ignore
export default class App extends Vue {
	private PERMISSIONS = {
		maple: Permissions
	}

	private get darkTheme(){ return ThemeStore.DARK_THEME }

	private menu: boolean = false
	private menuNotify: boolean = false
	private clipped: boolean = false
	private showDevResizer: boolean = false
	private drawer: boolean = true
	private fixed: boolean = false
	private miniVariant: boolean = false
	private right: boolean = true
	private rightDrawer: boolean = false
	private title: string = "GymKonnect"

	private items:
		{ icon: string, text: string, children: { icon: string, text: string, to: string }[], model: boolean, "icon-alt": string }[] |
		{ icon: string, heading: string, to?: string }[] |
		{ icon: string, text: string, to: string }[] | any
		= [
			{ icon: "dashboard", text: "Dashboard", to: "index", },
			{
				icon: "people", text: "Members", children: [
					{ icon: "view_list", text: "List", to: "gk/member-list", },
					{ icon: "group_add", text: "Registration", to: "gk/member-registration", },
					{ icon: "autorenew", text: "Renewal", to: "gk/member-renewal", },
					{ icon: "timer_off", text: "Freezing", to: "gk/member-freeze", },
				],
				"icon-alt": "people",
			},
			{
				icon: "library_add", text: "Add Ons", children: [
					{ icon: "assignment_ind", text: "Registrations", to: "gk/addons-registration", },
					{ icon: "event", text: "Bookings", to: "gk/addons-bookings", },
					{ icon: "forum", text: "Enquiry", to: "gk/addons-enquiry", },
				],
				"icon-alt": "library_add",
			},
			{ icon: "timeline", text: "Sales & Finance", to: "gk/payment", },
			{ icon: "assessment", text: "Reports", to: "gk/reports", },
			{ icon: "bubble_chart", text: "HR", to: "gk/hr", },
			{
				icon: "settings", text: "Settings", children: [
					{ icon: "fas fa-ethernet", text: "Hardware", to: "gk/settings-hardware", },
					{ icon: "fas fa-paper-plane", text: "Plans & Offers", to: "gk/plans-offers", },
					{ icon: "fas fa-comments", text: "SMS & Emails", to: "gk/sms-emails", },
					{ icon: "fab fa-superpowers", text: "Admin Access", to: "gk/settings-admin", },
				],
				"icon-alt": "settings",
			},
		]
}
