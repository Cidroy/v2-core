import serverConfig from "~build/server/webpack.dev"
import webpack from "webpack"
import { ServerBuilder } from "~build/server/ServerBuilder"

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