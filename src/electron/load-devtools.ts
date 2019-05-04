export default function loadDevtools(){
	// Install `electron-debug` with `devtron`
	require("electron-debug")({ showDevTools: true })

	// Install `vue-devtools`
	require("electron").app.on("ready", () => {
		let installExtension = require("electron-devtools-installer")
		installExtension.default(installExtension.VUEJS_DEVTOOLS)
			.then(() => { })
			.catch(err => { console.log("Unable to install `vue-devtools`: \n", err) })
		// FIXME: apollo devtools does not connect to client
		installExtension.default(installExtension.APOLLO_DEVELOPER_TOOLS)
			.then(() => { })
			.catch(err => { console.log("Unable to install `apollo-devtools`: \n", err) })
	})
}
