import "reflect-metadata"

import parseArgs from "minimist"
import { MainProcess } from "./MainProcess"

let args = parseArgs(process.argv.slice(2))

MainProcess.main(args)
