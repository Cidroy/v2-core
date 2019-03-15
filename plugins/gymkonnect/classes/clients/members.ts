import { TMemberListTableItems } from "../types/member-list"
import GQLClient, { gql } from "@/utils/graphql"
import { USER_MODE } from "@classes/enum/user-mode"
import { formatDate } from "@/utils/misc"
import { IUser } from "@classes/interface/IUser"
import { sleep } from "@classes/misc"

async function getAllMembersForRegistrationList(): Promise<TMemberListTableItems[]> {
	type TGQLResultUsers = {
		id: number | string,
		mode: { name: USER_MODE, description: string, },
		user: {
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
					id
					mode{ name, description }
					user{ firstName, middleName, lastName, badgenumber, mobile, }
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
		id: user.id,
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

type TMemberResult = (Partial<IUser> & { foundBy: string, name: string })[]

async function find( value: string, keys: (keyof IUser)[] = [ "id", ]){
	let result: TMemberResult = [
		{
			id: 316,
			name: "Rinzler D. Vicky",
			badgenumber: "0000160",
			mobile: "8208302951",
			foundBy: keys[0],
		},
		{
			id: 912,
			name: "K Karthikeyan",
			badgenumber: "0009870",
			mobile: "8380040243",
			foundBy: keys[0],
		},
		{
			id: 123,
			name: "Nikhil Singh",
			badgenumber: "0009876",
			mobile: "9923142963",
			foundBy: keys[0],
		},
	]
	// FIXME: GQL Query
	await sleep(2000)
	return result
}

export const Members = {
	getAllMembersForRegistrationList,
	find,
}