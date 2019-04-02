import Chronos from "./lib/chronos"
import { Logger } from "@classes/CONSOLE"
import moment from "moment"

const Console = new Logger(`tasks/positron`)

function Tasks(){
	// List all your chronos tasks here

	// Chronos.Once(()=>{
	// 	Console.okay("event #3 in 10000ms", moment())
	// 	Chronos.Repeat(()=>{ Console.okay("repeat #2 in 1000ms", moment()) }, undefined, 1000)
	// }, undefined, 10000)

	// Chronos.Repeat(() => { Console.okay("repeat #1 in 1000ms", moment(), fiboo) }, undefined, 1000)
}

export default Tasks