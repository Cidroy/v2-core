/**
 * TODO: build release system for the rest
 */
import { resolve } from "~/config/resolve"
import NeutronBinaryBuilder from "~addons/neutron"
import os from "os"

let neutronBuilder = new NeutronBinaryBuilder(resolve("bin"), os.platform())
neutronBuilder.build()
