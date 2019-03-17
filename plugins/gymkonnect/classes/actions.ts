import router from "@/routes"
import { Routes } from "../routes"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`actions/gk`)
export async function gotoProfile(clientId: string | number ){}

export async function enroll(clientId: string | number ){}

export async function freezeUnfreeze(clientId: string | number ){}

export async function renew(clientId: string | number ){
	Console.verbose("renew", clientId)
	router.push({
		name: Routes.MEMBER_RENEWAL.name,
		params: <any>{ value: clientId },
	})
}

export async function preebookEnroll(clientId: string | number ){}

export async function blockUnblock(clientId: string | number ){}

export async function archive(clientId: string | number ){}