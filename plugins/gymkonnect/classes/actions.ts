import router from "@/routes"
import { Routes } from "../routes"
import { Logger } from "@classes/CONSOLE"
import { USER_MODE } from "@classes/enum/user-mode"
import { loading, alert } from "@/components/toast"
import Gymkonnect from "./clients"

const Console = new Logger(`actions/gk`)
export async function gotoProfile(clientId: string | number ){
	// TODO:
}

export async function enroll(clientId: string | number ){
	try {
		Console.verbose("enroll", clientId)
		await Gymkonnect.MemberRegistration.scanFingerprint(clientId)
	} catch (error) {
		Console.error(error)
		alert(error.toString(), "error")
	}
}

export async function freezeUnfreeze(clientId: string | number, mode: USER_MODE){
	// TODO: testing
	if(mode===USER_MODE.FREEZE){
		Console.verbose("unfreeze", clientId)
		let loader = loading("Unfreezing, Please wait ...")
		try {
			await Gymkonnect.Freezing.unfreeze(clientId)
			alert("Unfreezed Successfully!", "success")
		} catch (error) {
			Console.error(error)
			alert(error.toString(), "error")
		}
		// @ts-ignore
		loader.close && loader.close()
	} else {
		Console.verbose("freeze", clientId)
		router.push({
			name: Routes.MEMBER_FREEZE.name,
			params: <any>{ value: clientId },
		})
	}
}

export async function renew(clientId: string | number ){
	Console.verbose("renew", clientId)
	router.push({
		name: Routes.MEMBER_RENEWAL.name,
		params: <any>{ value: clientId },
	})
}

export async function preebookEnroll(clientId: string | number, transactionId: string | number){
	Console.verbose("prebook-enroll", clientId)
	let loader = loading("Enrolling ...")
	try {
		await Gymkonnect.Renewal.prebookEnroll(clientId, transactionId)
		alert("Enrolled successfully", "success")
	} catch (error) {
		Console.error(error)
		alert(error.toString(), "error")
	}
	// @ts-ignore
	loader.close && loader.close()
}

export async function blockUnblock(clientId: string | number ){
	// TODO:
}

export async function archive(clientId: string | number ){
	// TODO:
}