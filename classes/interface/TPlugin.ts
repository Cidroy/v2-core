import { TRoute, TMenu, TAutoThread } from "@classes/types/application"

type TPlugin = {
	name: string,
	version: string,
	routes: TRoute[],
	menus: TMenu[],
	models: any[],
	migrations: any[],
	resolvers: any[],
	loaders: any[],
	threads: TAutoThread[],
	install: null | {},
	// tslint:disable-next-line: ban-types
	events: Record<string, Function>,
	printer?: {
		templates: string,
		assets?: string,
	}
}

export default TPlugin
