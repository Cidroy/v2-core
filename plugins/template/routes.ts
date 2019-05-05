import llv from "@classes/utils/lazy-load-view"
import { TRoute } from "@classes/types/application"

const lazyLoadView = (file: string) => llv(
	file,
	(file: string) => import(/* webpackChunkName: "page-[name]" */ `./pages${file}`)
)

export const routes: Record<string, TRoute> = {
}

export default Object.values(routes)
