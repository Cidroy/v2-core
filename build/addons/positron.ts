/**
 * TODO: build release system for the rest
 */
import ServerExecutableBuilder from "~addons/positron/index"
import { resolve } from "../webpack.base"

let positronBuilder  = new ServerExecutableBuilder(resolve("bin"), "linux")
positronBuilder.build()