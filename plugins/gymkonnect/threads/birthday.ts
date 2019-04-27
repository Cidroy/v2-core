import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`birthday/gk-thread`)
export default function BirthdayThread(){
	try {
		Console.log("ho gya bday bc")
	} catch (error) {
		Console.error(error)
	}
}