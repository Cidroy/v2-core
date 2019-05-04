import Plugins from "./plugin-list"
import { TMenu } from "@classes/types/application"

let menus: TMenu[] = []

Plugins.forEach(plugin => menus = menus.concat(plugin.menus) )

export default menus
