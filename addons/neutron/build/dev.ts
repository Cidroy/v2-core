import serverConfig from "~neutron/build/webpack.dev"
import webpack from "webpack"
import { ServerBuilder } from "~neutron/build/ServerBuilder"

let devServer = new ServerBuilder(
	serverConfig,
	<string>(<webpack.Output>serverConfig.output).path,
	{
		buildingFor: "compiling for development ...",
		buildComplete: "Compilation Complete, Listning for changes",
		buildFailed: "Compilation failed",
	}
)
devServer.build()
