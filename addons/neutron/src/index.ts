import "reflect-metadata"
import parseArgs from "minimist"

import { Neutron } from "@neutron/NEUTRON"

let args = parseArgs(process.argv.slice(2))
let neutron = new Neutron(args)
neutron.startServer()

// neutron.test()