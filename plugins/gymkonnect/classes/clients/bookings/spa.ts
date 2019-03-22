import GQLClient, { gql } from "@/utils/graphql"
import { Logger } from "@classes/CONSOLE"
import { PaymentDetail } from "../../types/payment"
import { TSpaBookingArgs } from "../../types/bookings"
import { confirm } from "@/components/toast"

const Console = new Logger(`spa/gk-client`)

async function getAmount(param: TSpaBookingArgs): Promise<number> {
	// TODO: [Vicky][Nikhil]
	if(1) return 1
	try {
		let response = await GQLClient.query<{ amount: number }>(
			gql``,
			{}
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to fetch amount"
		return response.data.amount
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

async function pay(clientId: string | number, transaction: TSpaBookingArgs, paymentData?: PaymentDetail):Promise<{ bookingId: string | number, }>{
	// TODO: [Vicky][Nikhil]
	try {
		if(!paymentData){
			let confirmed = await confirm("Book without payment? You can pay later.")
			if(!confirmed) throw "Transaction Cancelled"
		}
		if(1) return { bookingId: 0 }
		let response = await GQLClient.mutate<{ bookingId: string | number }>(
			gql``,
			{}
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to error"
		return response.data
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

export const Spa = {
	getAmount,
	pay,
}