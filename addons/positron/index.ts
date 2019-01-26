import serverConfig from "~positron/build/webpack.prod"
import config from "~positron/config"
import ServerExecutableBuilder from "~/build/helpers/ServerBuilder"

export default class PositronBinaryBuilder extends ServerExecutableBuilder{
	constructor(buildPath: string, platform: string){
		super(buildPath, platform, {
			Namespace: "positron/binary-builder",
			ServerName: "Positron",
			serverConfig,
			config
		})
	}
}