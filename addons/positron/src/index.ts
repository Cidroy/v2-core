import "reflect-metadata"

import parseArgs from "minimist"
import { MainProcess } from "./MainProcess"

let args = parseArgs(process.argv.slice(2))

// #!if development
args = {
	...args,
	verbose: true,
}
// #!endif

MainProcess.main(args)

// if (module && module.hot) {
// 	module.hot.accept()
// 	module.hot.dispose(() => {
// 		console.log("reloading")
// 		MainProcess.shutdown()
// 	})
// }
