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
export type TGQLPurposes = TGQLBasic
export type TGQLMembershipTypes = TGQLBasic
export type TGQLBloodGroup = TGQLBasic
export type TGQLUTMSource = TGQLBasic
export type TGQLOffer = TGQLBasic
export type TGQLDoor = TGQLBasic & { zoneId: string, zoneName: string }
export type TGQLTimeSlot = TGQLBasic & { startTime: string, endTime: string, }
export type TGQLPaymentModes = TGQLBasic & { requireTransactionId: boolean }
// FIXME: choose proper duration in next pull
export type TGQLPackages = TGQLBasic & { count: number, duration: string }
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

	public static async GetIdTypes(): Promise<TGQLIDProofs[]>{
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

	public static async GetPackages(): Promise<TGQLPackages[]> {
		let response = await GQLClient.query<{ gymPackages: TGQLPackages[] }>(
			gql`
				query gymPackages{
					gymPackages{
						id
						name
						count
						duration
					}
				}
			`,
		)
		return response.data.gymPackages
	}

	public static async GetPurposes(): Promise<TGQLPurposes[]> {
		let response = await GQLClient.query<{ gymPurposes: TGQLPurposes[] }>(
			gql`
				query gymPurposes{
					gymPurposes{
						id
						name
					}
				}
			`,
		)
		return response.data.gymPurposes
	}

	public static async GetMembershipTypes(): Promise<TGQLMembershipTypes[]> {
		let response = await GQLClient.query<{ membershipTypes: TGQLMembershipTypes[] }>(
			gql`
				query membershipTypes{
					membershipTypes{
						id
						name
					}
				}
			`,
		)
		return response.data.membershipTypes
	}

	public static async GetBloodGroups(): Promise<TGQLBloodGroup[]> {
		let response = await GQLClient.query<{ bloodGroups: TGQLBloodGroup[] }>(
			gql`
				query bloodGroups{
					bloodGroups{
						id
						name
					}
				}
			`,
		)
		return response.data.bloodGroups
	}

	public static async GetUTMSources(): Promise<TGQLUTMSource[]> {
		let response = await GQLClient.query<{ utmSources: TGQLUTMSource[] }>(
			gql`
				query utmSources{
					utmSources{
						id
						name
					}
				}
			`,
		)
		return response.data.utmSources
	}

	public static async GetAllOffers(): Promise<TGQLOffer[]> {
		let response = await GQLClient.query<{ gymOffers: TGQLOffer[] }>(
			gql`
				query gymOffers{
					gymOffers{
						id
						name
					}
				}
			`,
		)
		return response.data.gymOffers
	}

	public static async GetPaymentModes(): Promise<TGQLPaymentModes[]> {
		let response = await GQLClient.query<{ paymentModes: TGQLPaymentModes[] }>(
			gql`
				query PaymentModes{
					paymentModes{
						id
						name
						requireTransactionId
					}
				}
			`,
		)
		return response.data.paymentModes
	}

	public static async GetTimeSlots(): Promise<TGQLTimeSlot[]> {
		let response = await GQLClient.query<{ timeSlot: TGQLTimeSlot[] }>(
			gql`
				query timeSlot{
					timeSlot{
						id
						name
						startTime
						endTime
					}
				}
			`,
		)
		return response.data.timeSlot
	}

	public static async GetDoors(): Promise<TGQLDoor[]> {
		let response = await GQLClient.query<{ doors: TGQLDoor[] }>(
			gql`
				query zonesAvailable{
					doors: zonesAvailable{
						id
						name
						zoneId
						zoneName
					}
				}
			`,
		)
		return response.data.doors
	}

}