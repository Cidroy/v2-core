import { default as Vue } from "vue"
import VueRouter from "vue-router"
// https://github.com/declandewet/vue-meta
import VueMeta from "vue-meta"
// Adds a loading bar at the top during page loads.
import routes from "./routes"

import { UserStore } from "@/state/user"
import { ApplicationStore } from "@/state/application"
import { UserClient } from "@/classes/clients/user"
import { PASSWORD_PREFERENCE } from "@classes/enum/misc"

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
	// FIXME: remove this before production
	if(!UserStore.USER_LOGGEDIN) await UserClient.Login("","",PASSWORD_PREFERENCE.PASSWORD, to.name)
	if (!(to.meta && to.meta.noAuth) && !UserStore.USER_LOGGEDIN) next({ name: "login" })
	else next()
})

router.afterEach((to, from) => {
	ApplicationStore.setAppRouterLoading(false)
})

export default router