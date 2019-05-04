import GQLClient, { gql } from "@/utils/graphql"
import { Logger } from "@classes/CONSOLE"
import { TRPTTransation } from "../../types/registrations"
import { PaymentDetail } from "../../types/payment"

const Console = new Logger(`personal-training/gk-client`)
async function getAmount(transaction:TRPTTransation):Promise<number>{
	if(1) return 0
	try {
		let response = await GQLClient.query<{ amount: number }>(
			gql``,
			{}
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to get amount"
		return response.data.amount
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

async function pay(clientId: string | number, transaction: TRPTTransation, paymentData?: PaymentDetail):Promise<{
	transactionId: string | number,
	paymentId ?: string | number
}>{
	if(1) return { transactionId: 0 }
	try {
		let response = await GQLClient.mutate<{}>(
			gql``,
			{}
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to save transaction"
		return {
			transactionId: 0
		}
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

export const PersonalTraining = {
	getAmount,
	pay,
}
