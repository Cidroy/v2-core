import GQLClient, { gql } from "@/utils/graphql"
import { Logger } from "@classes/CONSOLE"
import { TFreezeTransaction } from "../../types/freeze"

const Console = new Logger(`freeze/gk-client`)

async function basePrice(clientId: string | number, transactionId: string | number):Promise<number>{
	// TODO:
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
	// TODO:
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

export const Freezing = {
	basePrice,
	amount,
}