/**
 * TODO: build release system for the rest
 */
import ServerExecutableBuilder from "~addons/neutron"
import { resolve } from "../webpack.base"

let neutronBuilder  = new ServerExecutableBuilder(resolve("bin"), "linux")
neutronBuilder.build()