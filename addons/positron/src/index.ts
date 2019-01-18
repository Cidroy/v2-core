import "reflect-metadata"
import parseArgs from "minimist"

import { Positron } from "@positron/POSITRON"

let args = parseArgs(process.argv.slice(2))
let positron = new Positron(args)
positron.main()