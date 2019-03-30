import GQLClient, { gql } from "@/utils/graphql"
import { Logger } from "@classes/CONSOLE"
import { USER_MODE } from "@classes/enum/user-mode"
import { formatDate } from "@/utils/misc"
import { gotoProfile, blockUnblock, editRenewal } from "../../actions"

type TListResult = {
	id: string | number,
	badgenumber: string,
	mode: string,
	name: string,
	membership: string,
	package: string,
	startDate: string,
	endDate: string,
	mobile: string,
	transaction: {
		id: string | number
	}
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
	iconClass ?: string,
	action: any,
} | null )[] {
	if(!item) return []
	return [
		// TODO: make this permission based
		true ? { icon: "person", name: "Profile", action: () => { gotoProfile(item.id) } } : null,
		true ? { icon: "edit", name: "Edit Renewal", action: () => { editRenewal(item.transaction.id) } } : null,
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
	let users: TListResult[] = result.data.Users.map(user => ({
		id: user.user ? user.user.id : 0,
		badgenumber: user.user ? user.user.badgenumber : "Unavailable",
		mode: user.mode.name,
		name: user.user ? `${user.user.firstName || ""} ${user.user.middleName || ""} ${user.user.lastName || ""}` : "Unavailable",
		membership: user.transaction ? user.transaction.membership.name : "Unavailable",
		package: user.transaction ? user.transaction.package.name : "Unavailable",
		startDate: user.transaction ? formatDate(user.transaction.startDate.split("T")[0]) : "Unavailable",
		endDate: user.transaction ? formatDate(user.transaction.endDate.split("T")[0]) : "Unavailable",
		mobile: user.user ? user.user.mobile : "Unavailable",
		transaction: {
			id: user.transaction ? user.transaction.id : "0",
		}
	}))
	return users
}

export const Renewals = {
	TABLE_HEADING,
	CONTEXTMENU,
	LIST,
}