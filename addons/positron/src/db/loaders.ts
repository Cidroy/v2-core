import Plugins from "@classes/core/plugin-list"

let loaders: any[] = []
Plugins.forEach(plugin => loaders = loaders.concat(plugin.loaders))

export default loaders
