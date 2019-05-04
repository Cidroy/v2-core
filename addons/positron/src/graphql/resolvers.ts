import Plugins from "@classes/core/plugin-list"

let resolvers: any[] = []
Plugins.forEach(plugin => resolvers = resolvers.concat(plugin.resolvers))

export default resolvers
