import { TMemberListTableItems } from "../types/member-list"
import GQLClient, { gql } from "@/utils/graphql"
import { USER_MODE } from "@classes/enum/user-mode"
import { formatDate } from "@/utils/misc"

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
		{
			fetchPolicy: "no-cache"
		}
	)
	let users: TMemberListTableItems[] = result.data.Users.map(user => ({
		id: user.id,
		badgenumber: user.user.badgenumber,
		mode: user.mode.name,
		name: `${user.user.firstName} ${user.user.middleName || ""} ${user.user.lastName || ""}`,
		membership: user.transaction.membership.name,
		package: user.transaction.package.name,
		endDate: formatDate(user.transaction.endDate.split("T")[0]),
		mobile: user.user.mobile,
		enrolled: user.enrolled,
	}))
	return users
}

export const Members = {
	getAllMembersForRegistrationList,
}