// FIXME: [Nikhil][Vicky]
import GQLClient, { gql } from "@/utils/graphql"
import { Logger } from "@classes/CONSOLE"
import { USER_MODE } from "@classes/enum/user-mode"
import { formatDate } from "@/utils/misc"
import { gotoProfile, blockUnblock, freezeUnfreeze, cancelFreezing } from "../../actions"

type TListResult = {
	id: string | number,
	badgenumber: string,
	mode: USER_MODE,
	name: string,
	membership: string,
	package: string,
	/**
	 * Freezing Start Date
	 *
	 * @type {string}
	 */
	startDate: string,
	/**
	 * Freezing End Date
	 *
	 * @type {string}
	 */
	endDate: string,
	freezingBalance: string,
	mobile: string,
	transaction: { id: string | number }
	freezing: { id: string | number }
}

type TTableHeading = {
	text: string,
	value: keyof TListResult,
	width?: string,
	align?: string,
}

const Console = new Logger(`renewals/reports/gk-client`)
async function TABLE_HEADING(): Promise<TTableHeading[]> {
	// TODO: [Vicky] Make dynamic
	if (1) return [
		// TODO: make this permission based
		{ text: "Badge", value: "badgenumber", align: "left" },
		{ text: "Status", value: "mode", width: "100px", },
		{ text: "Name", value: "name", width: "200px", },
		{ text: "Membership", value: "membership", width: "10%", },
		{ text: "Package", value: "package", width: "10%", },
		{ text: "Start Date", value: "startDate", width: "10%", },
		{ text: "End Date", value: "endDate", width: "10%", },
		{ text: "Balance", value: "freezingBalance", width: "200px", },
		{ text: "Mobile No.", value: "mobile", width: "10%", },
	]
	try {
		// TODO: [Nikhil] create custom table handling mechanism
		let response = await GQLClient.mutate<{ headings: any }>(
			gql``,
			{}
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to get Renewal table headings"
		return response.data.headings
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

function CONTEXTMENU(item: TListResult): ({
	icon: string,
	name: string,
	iconClass?: string,
	action: any,
} | null)[] {
	if (!item) return []
	return [
		// TODO: make this permission based
		true ? { icon: "person", name: "Profile", action: () => { gotoProfile(item.id) } } : null,
		[USER_MODE.FREEZE, USER_MODE.ACTIVE,].includes(item.mode) ? {
			iconClass: "far", icon: "fa-snowflake", name: item.mode === USER_MODE.FREEZE ? "Unfreeze" : "Freeze",
			action: () => { freezeUnfreeze(item.id, item.mode) }
		} : null,
		true ? { icon: "cancel", name: "Cancel Freezing", action: () => { cancelFreezing(item.freezing.id) } } : null,
		true ? { icon: "block", name: item.mode === USER_MODE.BANNED ? "Unblock" : "Block", action: () => { blockUnblock(item.id) } } : null,
	].filter(i => !!i)
}

async function LIST(payload: {
	start?: string,
	end?: string,
}): Promise<TListResult[]> {
	type TGQLResultUsers = {
		mode: { name: USER_MODE, description: string, },
		user: {
			id: number | string,
			firstName: string,
			middleName: string,
			lastName: string,
			badgenumber: string,
			mobile: string,
		},
		transaction: {
			id: string | number
			membership: { id: number | string, name: string }
			package: { id: number | string, name: string }
			endDate: string
			startDate: string
		},
		// FIXME: [Nikhil] implement in gql
		freezing: {
			balance: {
				days: number,
				count: number,
			},
			id: string | number
		}
	}
	type TResult = { Users: TGQLResultUsers[] }
	let result = await GQLClient.query<TResult>(
		// FIXME: [Nikhil] Get Renewals list in same format given the param
		gql`
			query Users{
				Users: gymUsers{
					mode{ name, description }
					user{ id, firstName, middleName, lastName, badgenumber, mobile, }
					transaction{
						id
						membership{ id, name, }
						package: packagesType{ id, name }
						endDate: endExtendedDate
						startDate: start
					}
				}
			}
		`,
		{},
		{ fetchPolicy: "no-cache" }
	)
	let users: TListResult[] = result.data.Users.map(row => ({
		id: row.user ? row.user.id : 0,
		badgenumber: row.user ? row.user.badgenumber : "Unavailable",
		mode: row.mode.name,
		name: row.user ? `${row.user.firstName || ""} ${row.user.middleName || ""} ${row.user.lastName || ""}` : "Unavailable",
		membership: row.transaction ? row.transaction.membership.name : "Unavailable",
		package: row.transaction ? row.transaction.package.name : "Unavailable",
		startDate: row.transaction ? formatDate(row.transaction.startDate.split("T")[0]) : "Unavailable",
		endDate: row.transaction ? formatDate(row.transaction.endDate.split("T")[0]) : "Unavailable",
		mobile: row.user ? row.user.mobile : "Unavailable",
		transaction: {
			id: row.transaction ? row.transaction.id : "0",
		},
		// FIXME: remove `1 ||`
		freezingBalance: `${1 || row.freezing.balance.days} Days, ${100 || row.freezing.balance.count} Times`,
		freezing: {
			id: 1 || row.freezing.id
		}
	}))
	return users
}

export const FREEZINGS = {
	TABLE_HEADING,
	CONTEXTMENU,
	LIST,
}