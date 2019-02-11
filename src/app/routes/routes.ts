import lazyLoadView from "@/utils/lazy-load-view"

export default [
	{
		path: "/",
		name: "index",
		component: () => lazyLoadView("/home"),
		props: true,
	},
	{
		path: "/m-list",
		name: "gk/member-list",
		component: () => lazyLoadView("/m-list"),
		props: true,
	},
	{
		path: "/m-registration",
		name: "gk/member-registration",
		component: () => lazyLoadView("/m-registration"),
		props: true,
	},
	{
		path: "/m-renewal",
		name: "gk/member-renewal",
		component: () => lazyLoadView("/m-renewal"),
		props: true,
	},
	{
		path: "/m-freeze",
		name: "gk/member-freeze",
		component: () => lazyLoadView("/m-freeze"),
		props: true,
	},
	{
		path: "/registrations",
		name: "gk/addons-registration",
		component: () => lazyLoadView("/registrations"),
		props: true,
	},
	{
		path: "/bookings",
		name: "gk/addons-bookings",
		component: () => lazyLoadView("/bookings"),
		props: true,
	},
	{
		path: "/enquiry",
		name: "gk/addons-enquiry",
		component: () => lazyLoadView("/enquiry"),
		props: true,
	},
	{
		path: "/user-profile",
		name: "gk/user-profile",
		component: () => lazyLoadView("/user-profile"),
		props: true,
	},
	{
		path: "/hr",
		name: "gk/hr",
		component: () => lazyLoadView("/hr"),
		props: true,
	},
	{
		path: "/payment",
		name: "gk/payment",
		component: () => lazyLoadView("/payment"),
		props: true,
	},
	{
		path: "/help",
		name: "help",
		component: () => lazyLoadView("/help"),
		props: true,
	},
	{
		path: "/about",
		name: "about",
		component: () => lazyLoadView("/about"),
		props: true,
	},
	{
		path: "/login",
		name: "login",
		component: () => lazyLoadView("/login"),
		props: true,
	},
	{
		path: "/hw-settings",
		name: "gk/settings-hardware",
		component: () => lazyLoadView("/hw-settings"),
		props: true,
	},
	{
		path: "/plans-offers",
		name: "gk/plans-offers",
		component: () => lazyLoadView("/plans-offers"),
		props: true,
	},
	{
		path: "/sms-emails",
		name: "gk/sms-emails",
		component: () => lazyLoadView("/sms-emails"),
		props: true,
	},
	{
		path: "/admin-settings",
		name: "gk/settings-admin",
		component: () => lazyLoadView("/admin-settings"),
		props: true,
	},
	{
		path: "/reports",
		name: "gk/reports",
		component: () => lazyLoadView("/reports"),
		props: true,
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
		props: true,
	},
]