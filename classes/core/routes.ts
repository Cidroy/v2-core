import Plugins from "./plugin-list"
import { TRoute } from "@classes/types/application"

let routes: TRoute[] = []

Plugins.reverse().forEach(plugin => routes = routes.concat(plugin.routes) )

export default routes
