import Plugins from "@classes/core/plugin-list"

let entities: any[] = []

Plugins.forEach(plugin => entities = entities.concat(plugin.models))

export default entities
