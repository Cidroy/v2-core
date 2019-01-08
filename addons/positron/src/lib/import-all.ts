// TODO: implement import
function importAll(directory: string, regex: RegExp = /[\w-]+-layout\.vue$/, subdirectories: boolean = false){
	// https://webpack.js.org/guides/dependency-management/#require-context
	const requireComponent = require.context(
		// Look for files in the directory
		directory,
		// Do not look in subdirectories
		subdirectories,
		// Only include "-layout" postfixed .vue files
		regex
	)

	// For each matching file name...
	requireComponent.keys().forEach(fileName => {
		// Get the component config
		const componentConfig = requireComponent(fileName)
		// Get the PascalCase version of the component name
	})
}

export default importAll