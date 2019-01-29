import { default as Vue } from "vue"
import VueRouter from "vue-router"
// https://github.com/declandewet/vue-meta
import VueMeta from "vue-meta"
// Adds a loading bar at the top during page loads.
import routes from "./routes"

Vue.use(VueRouter)
Vue.use(VueMeta, {
	// The component option name that vue-meta looks for meta info on.
	keyName: "page",
})

const router = new VueRouter({
	routes,
	// Simulate native-like scroll behavior when navigating to a new
	// route and using back/forward buttons.
	scrollBehavior: (to, from, savedPosition) => savedPosition ? savedPosition : { x: 0, y: 0 },
})

export default router