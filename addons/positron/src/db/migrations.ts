import Plugins from "@classes/core/plugin-list"

let migrations: any[] = []
Plugins.forEach(plugin => migrations = migrations.concat(plugin.migrations))

export default migrations