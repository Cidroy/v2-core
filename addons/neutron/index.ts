import serverConfig from "~neutron/build/webpack.prod"
import config from "~neutron/config"
import ServerExecutableBuilder from "~/build/helpers/ServerBuilder"

export default class NeutronBinaryBuilder extends ServerExecutableBuilder {
	constructor(buildPath: string, platform: string) {
		super(buildPath, platform, {
			Namespace: "neutron/binary-builder",
			ServerName: "Neutron",
			serverConfig,
			config
		})
	}
}
