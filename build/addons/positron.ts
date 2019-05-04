/**
 * TODO: build release system for the rest
 */
import { resolve } from "../webpack.base"
import PositronBinaryBuilder from "~addons/positron"
import os from "os"

let positronBuilder = new PositronBinaryBuilder(resolve("bin"), os.platform())
positronBuilder.build()
