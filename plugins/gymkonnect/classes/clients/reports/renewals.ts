import GQLClient, { gql } from "@/utils/graphql"
import { Logger } from "@classes/CONSOLE"
import { TMemberListTableItems } from "../../types/member-list"
import { USER_MODE } from "@classes/enum/user-mode"
import { formatDate } from "@/utils/misc"

const Console = new Logger(`renewals/reports/gk-client`)
async function TABLE_HEADING(): Promise<any> {
	// FIXME: [Vicky] change titles
	if (1) return [
		{ text: "Badge", value: "badgenumber", align: "left", width: "100px", },
		{ text: "Status", value: "mode", width: "100px", },
		{ text: "Name", value: "name", width: "200px", },
		{ text: "Due Date", value: "endDate", width: "10%", },
		{ text: "Membership", value: "membership", width: "10%", },
		{ text: "Package", value: "package", width: "10%", },
		{ text: "Mobile No.", value: "mobile", width: "10%", },
		{ text: "Enrolled", value: "enrolled", width: "100px", },
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

// FIXME: [Vicky] make contextmenu
function CONTEXTMENU(id: string | number): {
	icon: string,
	name: string,
	iconClass ?: string,
	action: any,
}[] {
	return []
}

// FIXME: [Vicky]
async function LIST(payload: {
	start?: string,
	end?: string,
}): Promise<TMemberListTableItems[]> {
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
		}
		enrolled: boolean
	}
	type TResult = { Users: TGQLResultUsers[] }
	let result = await GQLClient.query<TResult>(
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
					}
					enrolled
				}
			}
		`,
		{},
		{ fetchPolicy: "no-cache" }
	)
	let users: TMemberListTableItems[] = result.data.Users.map(user => ({
		id: user.user ? user.user.id : 0,
		badgenumber: user.user ? user.user.badgenumber : "Unavailable",
		mode: user.mode.name,
		name: user.user ? `${user.user.firstName || ""} ${user.user.middleName || ""} ${user.user.lastName || ""}` : "Unavailable",
		membership: user.transaction ? user.transaction.membership.name : "Unavailable",
		package: user.transaction ? user.transaction.package.name : "Unavailable",
		endDate: user.transaction ? formatDate(user.transaction.endDate.split("T")[0]) : "Unavailable",
		mobile: user.user ? user.user.mobile : "Unavailable",
		enrolled: user.enrolled || false,
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