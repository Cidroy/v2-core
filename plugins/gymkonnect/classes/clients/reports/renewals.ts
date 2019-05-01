import GQLClient, { gql } from "@/utils/graphql"
import { Logger } from "@classes/CONSOLE"
import { USER_MODE } from "@plugins/gymkonnect/enum/user-mode"
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
		gymUser:{
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
				packagesType: { id: number | string, name: string }
				endExtendedDate: string
				start: string
			}
		}
	}
	type TResult = { Renewals: TGQLResultUsers[] }
	let result = await GQLClient.query<TResult>(
		gql`
			query Renewals( $from: String, $to: String ){
				Renewals: renewals( from: $from, to: $to ){
					gymUser{
						mode{ name,description }
						user{ id, firstName, middleName, lastName, badgenumber, mobile }
						transaction{
							id,
							membership{ id, name },
							packagesType{ id,name }
							start
							endExtendedDate
						}
					}
				}
			}
		`,
		{
			from: payload.start,
			to: payload.end,
		},
		{ fetchPolicy: "no-cache" }
	)
	let users: TListResult[] = []
	try {
		users = result.data.Renewals.map(user => ({
			id: user.gymUser ? (user.gymUser.user? user.gymUser.user.id: 0) : 0,
			badgenumber: user.gymUser ? (user.gymUser.user ? user.gymUser.user.badgenumber : "Unavailable") : "Unavailable",
			mode: user.gymUser ? user.gymUser.mode.name: "",
			name: user.gymUser ? `${user.gymUser.user.firstName || ""} ${user.gymUser.user.middleName || ""} ${user.gymUser.user.lastName || ""}` : "Unavailable",
			membership: user.gymUser ? (user.gymUser.transaction ? user.gymUser.transaction.membership.name : "Unavailable") : "Unavailable",
			package: user.gymUser ? (user.gymUser.transaction ? user.gymUser.transaction.membership.name :"Unavailable") : "Unavailable",
			startDate: user.gymUser ? (user.gymUser.transaction ? formatDate(user.gymUser.transaction.start.split("T")[0]) : "Unavailable") : "Unavailable",
			endDate: user.gymUser ? (user.gymUser.transaction ? formatDate(user.gymUser.transaction.endExtendedDate.split("T")[0]) : "Unavailable") : "Unavailable",
			mobile: user.gymUser ? user.gymUser.user.mobile  : "Unavailable",
			transaction: {
				id: user.gymUser ? (user.gymUser.transaction ? user.gymUser.transaction.id : "0") : "0",
			}
		}))
	} catch (error) { Console.error(error) }
	return users
}

export const RENEWALS = {
	TABLE_HEADING,
	CONTEXTMENU,
	LIST,
}