import { TSMSTemplates } from "../types/messages"
import { sleep } from "@classes/misc"
import { IUser } from "@plugins/core/interfaces/IUser"

async function getTemplates(): Promise<TSMSTemplates[]> {
	// TODO:
	await sleep(2000)
	return [
		{ id: 1, name: "Message 1", message: "hwllo world is a new message here 1" },
		{ id: 2, name: "Message 2", message: "hwllo world is a new message here 2" },
		{ id: 3, name: "Message 3", message: "hwllo world is a new message here 3" },
	]
}

async function getMemberDetails(members: string[]): Promise<Partial<IUser>[]>{
	// TODO:
	await sleep(2000)
	return [
		{ id: 1, badgenumber: "00000001", mobile: "90000 00001", email: "1-ka-email@gmail.com", firstName: "1 First", middleName: "middle", lastName: "last", },
		{ id: 2, badgenumber: "00000002", mobile: "90000 00002", email: "2-ka-email@gmail.com", firstName: "2 First", middleName: "middle", lastName: "last", },
		{ id: 3, badgenumber: "00000003", mobile: "90000 00003", email: "3-ka-email@gmail.com", firstName: "3 First", middleName: "middle", lastName: "last", },
		{ id: 4, badgenumber: "00000004", mobile: "90000 00004", email: "4-ka-email@gmail.com", firstName: "4 First", middleName: "middle", lastName: "last", },
	]
}

async function sendSms(message: string, members: (string|number)[]): Promise<boolean>{
	// TODO:
	await sleep(2000)
	throw "You do not have sufficient balance!"
	// return [] with success and error
	return true
}

export const Messages = {
	getTemplates,
	getMemberDetails,
	sendSms,
}
