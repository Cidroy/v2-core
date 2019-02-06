import GQLClient, { gql } from "@/utils/graphql"
import { Logger } from "@classes/CONSOLE"

let Console = new Logger("gk/gql-helper")

export type TGQLBasic = { id: number | string, name: string, description: string }
export type TGQLOccupations = TGQLBasic
export type TGQLCategories = TGQLBasic
export type TGQLIDProofs = TGQLBasic
export type TGQLGroupings = TGQLBasic & { count: number, min: number, max: number, }
export type TGQLBodyTypes = TGQLBasic
export type TGQLOrganizationTypes = TGQLBasic
export default class GKHelper{
	public static async GetOccupations(): Promise<TGQLOccupations[]>{
		let response = await GQLClient.query<{
			occupations: TGQLOccupations[]
		}>(
			gql`
				query Occupations{
					occupations{
						id
						name
						description
					}
				}
			`,
		)
		return response.data.occupations
	}

	public static async GetCategories(): Promise<TGQLCategories[]>{
		let response = await GQLClient.query<{ categories: TGQLCategories[] }>(
			gql`
				query Categories{
					categories{
						id
						name
					}
				}
			`,
		)
		return response.data.categories
	}

	public static async GetIdProofs(): Promise<TGQLIDProofs[]>{
		let response = await GQLClient.query<{ IDTypes: TGQLIDProofs[] }>(
			gql`
				query IDTypes{
					IDTypes{
						id
						name
						description
					}
				}
			`,
		)
		return response.data.IDTypes
	}

	public static async GetGroupings(): Promise<TGQLGroupings[]>{
		let response = await GQLClient.query<{ groupings: TGQLGroupings[] }>(
			gql`
				query Groupings{
					groupings{
						id
						name
						min: minCount
						max: maxCount
						count: defaultCount
					}
				}
			`,
		)
		return response.data.groupings
	}

	public static async GetBodyTypes(): Promise<TGQLBodyTypes[]> {
		let response = await GQLClient.query<{ gymBodyTypes: TGQLBodyTypes[] }>(
			gql`
				query gymBodyTypes{
					gymBodyTypes{
						id
						name
					}
				}
			`,
		)
		return response.data.gymBodyTypes
	}

	public static async GetOrganizationTypes(): Promise<TGQLOrganizationTypes[]> {
		let response = await GQLClient.query<{ organizations: TGQLOrganizationTypes[] }>(
			gql`
				query organizations{
					organizations{
						id
						name
					}
				}
			`,
		)
		return response.data.organizations
	}
}