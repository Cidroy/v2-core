import llv from "@classes/utils/lazy-load-view"
import { TRoute } from "@classes/types/application"

const lazyLoadView = (file: string) => llv(
	file,
	(file: string) => import(/* webpackChunkName: "page-[name]" */ `./pages${file}`)
)

export const routes: Record<string, TRoute> = {
	INDEX: {
		path: "/",
		name: "index",
		component: () => lazyLoadView("/home"),
		props: true,
	},
	HELP: {
		path: "/help",
		name: "help",
		component: () => lazyLoadView("/help"),
		props: true,
	},
	ABOUT: {
		path: "/about",
		name: "about",
		component: () => lazyLoadView("/about"),
		props: true,
	},
	LOGIN: {
		path: "/login",
		name: "login",
		component: () => lazyLoadView("/login"),
		props: true,
		meta: { noAuth: true },
	},
	LOGOUT: {
		path: "/logout",
		name: "logout",
		component: () => lazyLoadView("/logout"),
		props: true,
	},
}

export default Object.values(routes)
