import GQLClient, { gql } from "@/utils/graphql"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`fitness-counseling/gk-client`)
type TFCTransaction = any

async function getAmount(transaction: TFCTransaction):Promise<number>{
	if(1) return 0
	// FIXME: [Nikhil][Vicky] gql
	try {
		let response = await GQLClient.mutate<{ amount: number }>(
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

export const FitnessCounseling = {
	getAmount,
}
