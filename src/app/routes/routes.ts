import lazyLoadView from "@/utils/lazy-load-view"

export default [
	{
		path: "/",
		name: "home",
		component: () => lazyLoadView("/home"),
	},
	{
		path: "/m-list",
		name: "M-List",
		component: () => lazyLoadView("/m-list"),
	},
	{
		path: "/m-registration",
		name: "M-Registration",
		component: () => lazyLoadView("/m-registration"),
	},
	{
		path: "/m-renewal",
		name: "M-Renewal",
		component: () => lazyLoadView("/m-renewal"),
	},
	{
		path: "/m-freeze",
		name: "M-Freeze",
		component: () => lazyLoadView("/m-freeze"),
	},
	{
		path: "/registrations",
		name: "Registrations",
		component: () => lazyLoadView("/registrations"),
	},
	{
		path: "/bookings",
		name: "Bookings",
		component: () => lazyLoadView("/bookings"),
	},
	{
		path: "/enquiry",
		name: "Enquiry",
		component: () => lazyLoadView("/enquiry"),
	},
	{
		path: "/profile",
		name: "Profile",
		component: () => lazyLoadView("/profile"),
	},
	{
		path: "/404",
		name: "404",
		component: require("@/pages/404").default,
		// Allows props to be passed to the 404 page through route
		// params, such as `resource` to define what wasn't found.
		props: true,
	},
	// Redirect any unmatched routes to the 404 page. This may
	// require some server configuration to work in production:
	// https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
	{
		path: "*",
		redirect: "404",
	},
]