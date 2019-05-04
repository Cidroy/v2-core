import moment from "moment"
import GQLClient, { gql } from "@plugins/core/utils/graphql"
import { Logger } from "@classes/CONSOLE"
import { TFreezeTransaction } from "../../types/freeze"
import { sleep } from "@classes/misc"
import { GymkonnectStore } from "@plugins/gymkonnect/state/gymkonnect"
import { PaymentDetail } from "../../types/payment"
import { PaymentData } from "../../types/registration"
import IFreezes from "@plugins/gymkonnect/interfaces/IFreezes"

const Console = new Logger(`freeze/gk-client`)

const defaultInfo = async () => {
	const {
		defaultRegistrationStep3User,
		defaultRegistrationUser
	} = await import("../../types/registration")
	return {
		transaction: {
			id: 0 as string | number,
			...defaultRegistrationStep3User,
			start: moment().toISOString().substr(0, 10),
			end: moment().toISOString().substr(0, 10),
		},
		grouping: (GymkonnectStore.GK_GROUPINGS[0] || { id: 0 }).id,
		usersCount: 1,
		client: defaultRegistrationUser,
		dojRange: {
			start: moment().toDate(),
			end: undefined as Date | undefined,
		},
		group: {
			id: 0 as string | number,
			name: "",
			members: [] as {
				id: string | number,
				badgenumber: string,
				name: string,
				mobile: string,
				end: string,
			}[]
		},
		freezing: {
			balance: {
				days: 1,
				count: 1,
			},
			used: {
				days: 0,
				count: 0,
			},
			history: [] as { start: string, end: string }[]
		}
	}
}

type TFreezingInfo = Unpacked<ReturnType<typeof defaultInfo>>

async function info(clientId: string | number): Promise<TFreezingInfo> {
	try {
		type TResponse = {
			data: {
				client: Partial<TFreezingInfo["client"]> & { category: string | number },
				timeSlot: string | number,
				transaction: {
					id: string,
					start: string,
					end: string,
					membershipType: string | number,
					packageMagnitude: number,
					packageType: string | number,
					purposes: (string | number)[],
					freezeAvailability?: { days?: number, count?: number },
					freezeId?: string | number,
					freezeDays?: number,
					freezeCount?: number
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
							id,
							start
							end: endExtendedDate
							membershipType
							packageMagnitude
							packageType: packages
							purposes: purpose
							freezeAvailability{
								days: freezeDaysAvailable
								count: freezeCountAvailable
							}
							freezeId
							freezeDays
							freezeCount
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
			{ fetchPolicy: "no-cache", }
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to get renewal Info"
		return {
			transaction: {
				id: response.data.data.transaction.id,
				category: response.data.data.client.category,
				doj: moment(response.data.data.transaction.end).toISOString().substr(0, 10),
				membershipType: response.data.data.transaction.membershipType,
				packageType: response.data.data.transaction.packageType,
				timeSlot: response.data.data.timeSlot,
				packageMagnitude: response.data.data.transaction.packageMagnitude,
				start: moment(response.data.data.transaction.start).toISOString().substr(0, 10),
				end: moment(response.data.data.transaction.end).toISOString().substr(0, 10),
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
				dob: (response.data.data.client.dob ? moment(response.data.data.client.dob) : moment()).toISOString().substr(0, 10),
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
					end: moment(member.transaction.end).toISOString().substr(0, 10),
				})),
			},
			freezing: {
				balance: {
					days: (response.data.data.transaction.freezeAvailability || { days: 0 }).days || 0,
					count: (response.data.data.transaction.freezeAvailability || { count: 0 }).count || 0,
				},
				used: {
					days: response.data.data.transaction.freezeDays || 0,
					count: response.data.data.transaction.freezeCount || 0,
				},
				history: []
			}
		}
	} catch (error) {
		Console.error("info", error)
		throw error.toString()
	}
}

async function basePrice(clientId: string | number, transactionId: string | number):Promise<number>{
	// TODO: [Vicky] After Chowgule,  get base price
	if(1) return 0
	try {
		let response = await GQLClient.query<{ price: number }>(
			gql``,
			{}
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to get price"
		return response.data.price
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

async function amount(clientId: string | number, transactionId: string | number, transactionData: TFreezeTransaction):Promise<number>{
	try {
		let response = await GQLClient.query<{ amount: number }>(
			gql`
				query FreezeAmount( $user: Float!, $from: String!, $to: String! ){
					amount: freezeAmount(user: $user, from : $from, to: $to )
				}
			`,
			{
				user: clientId,
				from: transactionData.start,
				end: transactionData.end,
			}
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to get price"
		return response.data.amount
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

async function addFreeze(
	clientId:string | number,
	transactionData: { start: string, end: string },
	payment?: PaymentDetail
):Promise<{
	freezeId: string | number,
	paymentId?: string | number
}>{
	try {
		let response = await GQLClient.mutate<{ freezing: { id: string | number } }>(
			gql`
				mutation AddFreeze(
					$start: DateTime!
					$user: Float!
					$end: DateTime
				){
					freezing: addFreeze(
						user: $user,
						start: $start,
						end: $end,
					){ id }
				}
			`,
			{
				user: clientId,
				start: transactionData.start,
				end: transactionData.end,
			}
		)
		// TODO: [Vicky] Make Payment
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to add freezing"
		return { freezeId: response.data.freezing.id, }
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

async function unfreeze(clientId: string | number, payment?: PaymentData & { id: string | number }):Promise<boolean>{
	try {
		let response = await GQLClient.mutate<{ Unfreeze: Partial<IFreezes> }>(
			gql`
				mutation Unfreeze( $payment: Float, $user: Float!, ){
					Unfreeze(payment:$payment, user: $user){ id }
				}
			`,
			{
				user: clientId,
				payment: payment? payment.id : undefined ,
			}
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to Unfreeze member"
		return true
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

export const Freezing = {
	basePrice,
	amount,
	unfreeze,
	info,
	defaultInfo,
	addFreeze,
}
