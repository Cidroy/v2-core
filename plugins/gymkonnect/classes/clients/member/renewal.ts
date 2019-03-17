import { Logger } from "@classes/CONSOLE"
import GQLClient, { gql } from "@/utils/graphql"
import { GymkonnectStore } from "@plugins/gymkonnect/state/misc"
import { sleep } from "@classes/misc"
import moment from "moment"
import { TMRegistrationStep3 } from "../../types/registration"
import { PaymentDetail } from "../../types/payment"

const Console = new Logger(`renewal/gk-client`)

const defaultInfo = async () => {
	const {
		defaultRegistrationStep3User,
		defaultRegistrationUser
	} = await import("../../types/registration")
	return {
		transaction: {
			...defaultRegistrationStep3User,
			start: moment().toISOString().substr(0,10),
			end: moment().toISOString().substr(0,10),
		},
		grouping: GymkonnectStore.GK_GROUPINGS[0].id,
		usersCount: 1,
		client: defaultRegistrationUser,
		dojRange: {
			start: moment().toDate(),
			end: undefined as Date | undefined,
		},
		group: {
			id: 0 as string | number,
			name: "" as string,
			members: [] as {
				id: string | number,
				badgenumber: string,
				name: string,
				mobile: string,
				end: string,
			}[]
		},

	}
}

type TRenewalInfo = Unpacked<ReturnType<typeof defaultInfo>>

async function info(clientId: string | number): Promise<TRenewalInfo> {
	try {
		type TResponse = {
			data: {
				client: Partial<TRenewalInfo["client"]> & { category: string | number },
				timeSlot: string | number,
				transaction: {
					start: string,
					end: string,
					membershipType: string | number,
					packageMagnitude: number,
					packageType: string | number,
					purposes: (string | number)[],
				}
				isGrouped: boolean,
				group: {
					id: string | number,
					name: string,
					members: {
						info: {
							id: string | number,
							badgenumber: string,
							name: string,
							mobile: string,
						}
						transaction: { end: string, }
					}[]
				}
			}
		}
		let response = await GQLClient.query<TResponse>(
			gql`
				query Details($clientId: Float!){
					data: gymUserDetails(userId: $clientId){
						client: user{
							category
							id
							badgenumber
							firstName
							middleName
							lastName
							gender
							mobile
							whatsappNumber: whatsapp
							email
							dob
							photo: imagePath
						}
						timeSlot
						transaction{
							start
							end: endExtendedDate
							membershipType
							packageMagnitude
							packageType: packages
							purposes: purpose
						}
						isGrouped
						group: userGroupDetails{
							id: groupingId
							name: groupName
							members: groupMembers{
								info: user{
									id
									badgenumber
									name
									mobile
								}
								transaction{
									end: endExtendedDate
								}
							}
						}
					}
				}
			`,
			{ clientId, },
			{ fetchPolicy: "network-only", }
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to det renewal Info"
		return {
			transaction: {
				category: response.data.data.client.category,
				doj: moment(response.data.data.transaction.end).toISOString().substr(0, 10),
				membershipType: response.data.data.transaction.membershipType,
				packageType: response.data.data.transaction.packageType,
				timeSlot: response.data.data.timeSlot,
				packageMagnitude: response.data.data.transaction.packageMagnitude,
				start: moment(response.data.data.transaction.start).toISOString().substr(0,10),
				end: moment(response.data.data.transaction.end).toISOString().substr(0,10),
			},
			grouping: response.data.data.group.id,
			usersCount: 1,
			client: {
				id: response.data.data.client.id!,
				mobile: response.data.data.client.mobile,
				whatsappNumber: response.data.data.client.whatsappNumber,
				email: response.data.data.client.email,
				firstName: response.data.data.client.firstName!,
				middleName: response.data.data.client.middleName!,
				lastName: response.data.data.client.lastName!,
				badgenumber: response.data.data.client.badgenumber!,
				photo: response.data.data.client.photo!,
				gender: response.data.data.client.gender!,
				dob: moment(response.data.data.client.dob!).toISOString().substr(0, 10),
				occupation: response.data.data.client.occupation!,
				idType: response.data.data.client.idType!,
				idNumber: response.data.data.client.idNumber!,
			} as any,
			dojRange: {
				start: moment(response.data.data.transaction.end).toDate(),
				end: undefined,
			},
			group: {
				id: response.data.data.group.id,
				name: response.data.data.group.name,
				members: response.data.data.group.members.map(member => ({
					id: member.info.id,
					badgenumber: member.info.badgenumber,
					name: member.info.name,
					mobile: member.info.mobile,
					end: moment(member.transaction.end).toISOString().substr(0,10),
				})),
			}
		}
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

async function renew(
	clientId: string | number,
	transactionData: TMRegistrationStep3,
	paymentData: PaymentDetail,
	groupingId: string | number
): Promise<{
	paymentId: string | number,
	transactionId: string | number,
}> {
	try {
		// FIXME:
		return {
			paymentId: 0,
			transactionId: 0,
		}

		let response: any = await GQLClient.mutate<{}>(
			gql``,
			{}
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to renew membership"
		return response.data
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

export const Renewal = {
	info,
	defaultInfo,
	renew,
}