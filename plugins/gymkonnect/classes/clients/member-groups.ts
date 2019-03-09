import { sleep } from "@classes/misc"

/**
 * Rename a Member Group
 *
 * @param {(string | number)} id Group id
 * @param {string} name Group name
 * @returns
 */
async function rename(id: string | number, name: string){
	await sleep(1000)
	// TODO: implement this
	throw "Group Renaming is not supported in this version"
	return id
}

export const MemberGroups = {
	rename,
}