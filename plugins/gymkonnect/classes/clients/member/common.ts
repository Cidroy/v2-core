import GQLClient, { gql } from "@plugins/core/utils/graphql"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`common/member/gk-cient`)
/**
 * Add Transaction
 *
 * @param {({
 * 		membershipType: string|number,
 * 		offer?: string|number,
 * 		gymUser: string|number,
 * 		start: Date,
 * 		packageMagnitude: number,
 * 		packages: string|number,
 * 	})} transaction
 * @returns {(Promise<{
 * 	id: string | number,
 * 	mode: string | number,
 * 	start: Date,
 * 	end: Date,
 * 	endExtendedDate: Date,
 * }>)}
 */
export async function addTransaction(
	transaction: {
		membershipType: string | number,
		offer?: string | number,
		gymUser: string | number,
		start: Date,
		packageMagnitude: number,
		packages: string | number,
	}
): Promise<{
	id: string | number,
	mode: string | number,
	start: Date,
	end: Date,
	endExtendedDate: Date,
}> {
	try {
		let response = await GQLClient.mutate<{
			transaction: {
				id: string | number,
				mode: string | number,
				start: Date,
				end: Date,
				endExtendedDate: Date,
			}
		}>(
			gql`
				mutation addTransaction(
					$membershipType: Float
					$offer: Float
					$gymUser: Float
					$start: DateTime!
					$packageMagnitude: Float!
					$packages: Float!
				){
					transaction: addTransaction(
						membershipType: $membershipType
						offer:$offer
						gymUser: $gymUser
						start:$start
						packageMagnitude: $packageMagnitude
						packages:$packages
					){
						id
						mode
						start
						end
						endExtendedDate
					}
				}
			`,
			{
				membershipType: transaction.membershipType,
				offer: !transaction.offer ? -1 : transaction.offer,
				gymUser: transaction.gymUser,
				start: transaction.start,
				packageMagnitude: typeof transaction.packageMagnitude === "string" ? parseInt(transaction.packageMagnitude) : transaction.packageMagnitude,
				packages: transaction.packages,
			}
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to save transaction"
		return response.data.transaction
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

/**
 * Add Payment
 *
 * @param {({
 * 	adjustment: string|number,
 * 	amount: number,
 * 	receipt: string|number,
 * 	mode: string|number,
 * })} payment details
 * @returns {(Promise<string|number>)} payment id
 */
export async function addPayment(payment: {
	adjustment?: number,
	amount: number,
	receipt: string | number,
	mode: string | number,
}): Promise<string | number> {
	try {
		if (!payment.adjustment) payment.adjustment = 0
		let response = await GQLClient.mutate<{ payment: { id: string | number } }>(
			gql`
				mutation AddPayment(
					$adjustment: Float!
					$amount: Float!
					$receipt: String!
					$mode: Float!
				){
					payment: addPayment(
						adjustment: $adjustment
						amount: $amount
						receipt: $receipt
						mode: $mode
					){
						id
					}
				}
			`,
			{
				adjustment: payment.adjustment,
				amount: payment.amount,
				receipt: payment.receipt,
				mode: payment.mode,
			}
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to save payment"
		return response.data.payment.id
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

/**
 * Link transaction and payment
 *
 * @param {(string|number)} transactionId transaction id
 * @param {(string|number)} paymentId payment id
 * @returns {Promise<boolean>} link status
 */
export async function linkTransactionPay(
	transactionId: string | number,
	paymentId: string | number
): Promise<boolean> {
	try {
		let response = await GQLClient.mutate<{ linked: boolean }>(
			gql`
				mutation linkTransactionPay(
					$transactionId: Float!
					$paymentId: Float!
				){
					linked: linkTransactionPay(
						transactionId: $transactionId
						paymentId: $paymentId
					)
				}
			`,
			{
				transactionId,
				paymentId,
			}
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to link transaction and payment"
		return response.data.linked
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

/**
 * Link Transaction to User
 *
 * @param {(string| number)} transactionId transaction id
 * @param {(string|number)} userId user id
 * @returns {Promise<boolean>} linked status
 */
export async function linkTransactionUser(transactionId: string | number, userId: string | number): Promise<boolean> {
	try {
		let response = await GQLClient.mutate<{ linked: boolean }>(
			gql`
				mutation linkTransactionUser( $transactionId: Float!, $userId: Float! ){
					linkTransactionUser( transactionId: $transactionId, userId: $userId )
				}
			`,
			{
				transactionId,
				userId,
			}
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to link transaction to user"
		return response.data.linked
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}
