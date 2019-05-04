// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView('/my-view')
//
// NOTE:
// 1. All the Views are required to be in '@/pages/' directory
// 2. Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@/pages/my-view')
//
/**
 *	Lazy Load Views
 *
 * @export
 * @param {string} viewName file name
 * @param {string} [importHandle=(file: string) => import(/* webpackChunkName: "page-[name]" * /`@/pages${file}`)] resolver method
 * (file: string) => import(/* webpackChunkName: "page-[name]" * /`@/pages${file}`)
 * @returns something
 */
export default function lazyLoadView(viewName: string, importHandle = (file: string) => import(/* webpackChunkName: "page-[name]" */ `@/pages${file}`)) {
	const AsyncView = importHandle(viewName)
	const AsyncHandler = () => ({
		component: AsyncView,
		// A component to use while the component is loading.
		loading: require("@plugins/core/pages/loading").default,
		// A fallback component in case the timeout is exceeded
		// when loading the component.
		error: require("@plugins/core/pages/timeout").default,
		// Delay before showing the loading component.
		// Default: 200 (milliseconds).
		delay: 400,
		// Time before giving up trying to load the component.
		// Default: Infinity (milliseconds).
		timeout: 10000,
	})
	return Promise.resolve({
		functional: true,
		render(h: any, { data, children }) {
			// Transparently pass any props or children
			// to the view component.
			return h(AsyncHandler, data, children)
		},
	})
}
