import { default as Vue } from "vue"
import VueRouter from "vue-router"
// https://github.com/declandewet/vue-meta
import VueMeta from "vue-meta"
// Adds a loading bar at the top during page loads.
import routes from "./routes"

import { UserStore } from "@plugins/core/state/user"
import { ApplicationStore } from "@plugins/core/state/application"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`router/core`)
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

router.beforeEach(async (to, from, next) => {
	ApplicationStore.setAppRouterLoading(true)
	Console.verbose(from.name, "=>", to.name)
	// FIXME: remove this before production
	// const { UserClient } = await import("@/classes/clients/user")
	// const { PASSWORD_PREFERENCE } = await import("@plugins/core/enum/misc")
	// if(!UserStore.USER_LOGGEDIN) await UserClient.Login("root","0000",PASSWORD_PREFERENCE.PIN, to.name)
	if (!(to.meta && to.meta.noAuth) && !UserStore.USER_LOGGEDIN) next({ name: "login" })
	else next()
})

router.afterEach((to, from) => {
	ApplicationStore.setAppRouterLoading(false)
})

export default router
