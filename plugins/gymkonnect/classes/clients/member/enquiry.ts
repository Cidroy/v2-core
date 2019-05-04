import GQLClient, { gql } from "@/utils/graphql"
import { Logger } from "@classes/CONSOLE"
import { TMRegistrationStep3, TMRegistrationStep4 } from "../../types/registration"

const Console = new Logger(`enquiry/gk-client`)
async function save(clientId: string | number, transactionData: TMRegistrationStep3 & TMRegistrationStep4):Promise<number | string>{
	if(1) return 1
	// TODO: [Nikhil][Vicky]
	try {
		let response = await GQLClient.mutate<{ enquiry: number | string }>(
			gql``,
			{}
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to save the enquiry"
		return response.data.enquiry
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

export const Enquiry = {
	save,
}
