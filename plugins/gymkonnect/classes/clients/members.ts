import { TMemberListTableItems } from "../types/member-list"
import GQLClient, { gql } from "@/utils/graphql"
import { USER_MODE } from "@classes/enum/user-mode"
import { formatDate } from "@/utils/misc"
import { IUser } from "@classes/interface/IUser"
import { sleep } from "@classes/misc"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`members/gk-client`)
async function getAllMembersForRegistrationList(): Promise<TMemberListTableItems[]> {
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
		id: user.user? user.user.id: 0,
		badgenumber: user.user?user.user.badgenumber:"Unavailable",
		mode: user.mode.name,
		name: user.user?`${user.user.firstName || ""} ${user.user.middleName || ""} ${user.user.lastName || ""}`:"Unavailable",
		membership: user.transaction?user.transaction.membership.name: "Unavailable",
		package: user.transaction?user.transaction.package.name: "Unavailable",
		endDate: user.transaction?formatDate(user.transaction.endDate.split("T")[0]): "Unavailable",
		mobile: user.user?user.user.mobile:"Unavailable",
		enrolled: user.enrolled || false,
	}))
	return users
}

type TMemberResult = (Partial<IUser> & { name: string })

async function find( value: string, keys: (keyof IUser)[] = [ "id", ]): Promise<TMemberResult[]>{
	try {
		let response = await GQLClient.query<{ users: TMemberResult[] }>(
			gql`
				query FindGymUsers($keys: [String!]!, $value: String!){
					users: FindGymUsers(keys: $keys, value: $value){
						id
						badgenumber
						mobile
						name
					}
				}
			`,
			{ keys, value, },
			{ fetchPolicy: "no-cache" }
		)
		if(response.errors) throw response.errors[0].message
		if(!response.data.users) throw "unable to search Users"
		return response.data.users
	} catch (error) {
		Console.error(error)
		return []
	}
}

export const Members = {
	getAllMembersForRegistrationList,
	find,
}