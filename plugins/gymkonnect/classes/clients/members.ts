import { TMemberListTableItems } from "../types/member-list"
import GQLClient, { gql } from "@/utils/graphql"
import { USER_MODE } from "@classes/enum/user-mode"
import { formatDate } from "@/utils/misc"
import { IUser } from "@classes/interface/IUser"
import { Logger } from "@classes/CONSOLE"
import { TMemberInfo } from "../types/misc"

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
		id: user.user? user.user.id: 0,
		badgenumber: user.user?user.user.badgenumber:"Unavailable",
		mode: user.mode.name,
		name: user.user?`${user.user.firstName || ""} ${user.user.middleName || ""} ${user.user.lastName || ""}`:"Unavailable",
		membership: user.transaction?user.transaction.membership.name: "Unavailable",
		package: user.transaction?user.transaction.package.name: "Unavailable",
		endDate: user.transaction?formatDate(user.transaction.endDate.split("T")[0]): "Unavailable",
		mobile: user.user?user.user.mobile:"Unavailable",
		enrolled: user.enrolled || false,
		transaction: {
			id: user.transaction? user.transaction.id: "0",
		}
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

async function info(clientId: string | number): Promise<TMemberInfo>{
	// TODO: [Vicky]
	if(1){
		const {
			defaultRegistrationStep1User,
			defaultRegistrationStep2User,
			defaultRegistrationStep3User,
		} = await import("../types/registration")
		return {
			...defaultRegistrationStep1User,
			...defaultRegistrationStep2User,
			transaction: {
				...defaultRegistrationStep3User,
				id: 0,
				start: new Date().toISOString().substr(0,10),
				end: new Date().toISOString().substr(0,10),
			}
		}
	}
	try {
		let response = await GQLClient.query<TMemberInfo>(
			gql``,
			{}
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to get member info"
		return response.data
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

export const Members = {
	getAllMembersForRegistrationList,
	find,
	info,
}