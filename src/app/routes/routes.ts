import lazyLoadView from "@classes/utils/lazy-load-view"
import Routes from "@classes/core/routes"

export default [
	...Routes,
	{
		path: "/404",
		name: "404",
		component: require("@/pages/404").default,
		// Allows props to be passed to the 404 page through route
		// params, such as `resource` to define what wasn't found.
		props: true,
		meta: { noAuth: true }
	},
	// Redirect any unmatched routes to the 404 page. This may
	// require some server configuration to work in production:
	// https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
	{
		path: "*",
		redirect: "404",
		props: true,
		meta: { noAuth: true }
	},
]
