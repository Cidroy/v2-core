// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.

import { default as Vue } from "vue"
import upperFirst from "lodash/upperFirst"
import camelCase from "lodash/camelCase"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`autoload/layouts/core`)
// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context(
	// Look for files in the current directory
	".",
	// Do not look in subdirectories
	false,
	// Only include "-layout" postfixed .vue files
	/[\w-]+-layout\.vue$/
)

// For each matching file name...
requireComponent.keys().forEach(fileName => {
	try {
		// Get the component config
		const componentConfig = requireComponent(fileName)
		// Get the PascalCase version of the component name
		const componentName = upperFirst(
			camelCase(
				`app-${fileName}`
					// Remove the file extension from the end
					.replace(/\.\w+$/, "")
			)
		)
		// Globally register the component
		Vue.component(componentName, componentConfig.default || componentConfig)
	} catch (error) {
		Console.error(fileName, error)
	}
})
