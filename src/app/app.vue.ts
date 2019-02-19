import appConfig from "@/app.config"
import { Component, Watch, Vue } from "vue-property-decorator"
import Keyboard from "mousetrap"
import devResizer from "@/components/dev-resizer.vue"
import { ThemeStore } from "@/state/theme"
import { MiscStore } from "@/state/modules/misc"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`gk-vue/${__filename}`)
@Component({
	// @ts-ignore
	components: { devResizer, },
	page: {
		// All subcomponent titles will be injected into this template.
		titleTemplate(title) {
			// @ts-ignore
			title = typeof title === "function" ? title(this.$store) : title
			return title ? `${title} | ${appConfig.title}` : appConfig.title
		},
	},
	created() {
		Keyboard.bind([ "command+p", "ctrl+p", ], () => {
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
			{ icon: "dashboard", text: "Dashboard", to: "/", },
			{
				icon: "people", text: "Members", children: [
					{ icon: "view_list", text: "List", to: "/m-list", },
					{ icon: "group_add", text: "Registration", to: "/m-registration", },
					{ icon: "autorenew", text: "Renewal", to: "/m-renewal", },
					{ icon: "timer_off", text: "Freezing", to: "/m-freeze", },
				],
				"icon-alt": "people",
			},
			{
				icon: "library_add", text: "Add Ons", children: [
					{ icon: "assignment_ind", text: "Registrations", to: "/registrations", },
					{ icon: "event", text: "Bookings", to: "/bookings", },
					{ icon: "forum", text: "Enquiry", to: "/enquiry", },
				],
				"icon-alt": "library_add",
			},
			{ icon: "timeline", text: "Sales & Finance", to: "/payment", },
			{ icon: "assessment", text: "Reports", to: "/reports", },
			{ icon: "bubble_chart", text: "HR", to: "/hr", },
			{
				icon: "settings", text: "Settings", children: [
					{ icon: "fas fa-ethernet", text: "Hardware", to: "/hw-settings", },
					{ icon: "fas fa-paper-plane", text: "Plans & Offers", to: "/plans-offers", },
					{ icon: "fas fa-comments", text: "SMS & Emails", to: "/sms-emails", },
					{ icon: "fab fa-superpowers", text: "Admin Access", to: "/admin-settings", },
				],
				"icon-alt": "settings",
			},
		]
	private profileList: { icon?: string, text: string, to?: string}[] = [
		{ text: "My Account", to: "/inspire",},
		{ text: "Dummy", to: "/inspire",},
		{ text: "Logout", to: "/login",},
		{ text: "Exit", to: "/inspire",},
	]
	
	private notis: ({ avatar?: string, title?: string, subtitle?: string } | { divider: boolean, inset: boolean }) [] =[
			
			{
			avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
			title: "Brunch this weekend?",
			subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; Do you want to hang out?"
			},
			{ divider: true, inset: true },
			{
			avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
			title: "Summer BBQ <span class=\"grey--text text--lighten-1\">4</span>",
			subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come."
			},
			{ divider: true, inset: true },
			{
			avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
			title: "Oui oui",
			subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations?"
			},
			{ divider: true, inset: true },
			{
			avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
			title: "Birthday gift",
			subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas?"
			},
			{ divider: true, inset: true },
			{
			avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
			title: "Recipe to try",
			subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this"
			},
	]
		
	private darkTheme:boolean = ThemeStore.DARK_THEME
	@Watch("darkTheme") private toggleDarkTheme(){ ThemeStore.toggleDarkTheme() }
}
