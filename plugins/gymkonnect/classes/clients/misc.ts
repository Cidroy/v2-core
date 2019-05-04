import GQLClient, { gql } from "@/utils/graphql"
import { Logger } from "@classes/CONSOLE"

let Console = new Logger("misc/gk-client")

export async function generateBadgenumber(quantity: number = 1): Promise<(string|number)[]>{
	let result = await GQLClient.query<{ badges: (string | number)[]}>(
		gql` query generateBadgenumber( $quantity: Float! ){ badges: generateBadgenumber(quantity: $quantity) } `,
		{ quantity, },
		{ fetchPolicy: "no-cache", }
	)
	return result.data.badges
}

/**
 * Verify if email exists
 *
 * @param {string} email email id
 * @returns {Promise<boolean>} true if exists
 */
export async function existsEmail(email: string): Promise<boolean> {
	try {
		let response = await GQLClient.query<{ exists: boolean }>(
			gql` query isEmailExists( $email: String! ){ exists: isEmailExists(email: $email) } `,
			{ email, }
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to verify if email exists"
		return response.data.exists
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

/**
 * Verify if mobile exists
 *
 * @param {string} mobile mobile
 * @returns {Promise<boolean>} true if exists
 */
export async function existsMobile(mobile: string): Promise<boolean> {
	try {
		let response = await GQLClient.query<{ exists: boolean }>(
			gql` query isMobileExists( $mobile: String! ){ exists: isMobileExists(mobile: $mobile) } `,
			{ mobile, }
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to verify if mobile exists"
		return response.data.exists
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

export async function receiptNumber():Promise<number | string>{
	try {
		// TODO:
		// let response = await GQLClient.query<{ receipt: number | string }>(
		// 	gql``,
		// 	{}
		// )
		// if (response.errors) throw response.errors[0].message
		// if (!response.data) throw "Unable to get receipt number"
		// return response.data.receipt
		return "1"
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

export const Health = {

	async addInitialHealth(id: string | number, height: number, weight: number, bodyType: string | number, bloodGroup: string | number): Promise<string|number>{
		try {
			height = typeof height === "string"? parseFloat(height): height
			weight = typeof weight === "string"? parseFloat(weight): weight
			let response = await GQLClient.mutate<{ initialHealth: { id: string | number } }>(
				gql`
					mutation addGymUserHealth(
						$bloodGroup: Float
						$bodyType: Float!
						$height: Float!
						$weight: Float!
					){
						initialHealth: addGymUserHealth(
							bloodGroup: $bloodGroup
							bodyType: $bodyType
							height: $height
							weight: $weight
						){
							id
						}
					}
				`,
				{
					bloodGroup,
					bodyType,
					height,
					weight,
				}
			)
			if (response.errors) throw response.errors[0].message
			if (!response.data) throw "Unable to Add Initial Health Details"

			let linked = await GQLClient.mutate<{ linked: boolean }>(
				gql`
					mutation linkHealthGymUser(
						$healthId: Float!
						$userId: Float!
					){
						linked: linkHealthGymUser(
							healthId: $healthId
							userId: $userId
						)
					}
				`,
				{
					healthId: response.data.initialHealth.id,
					userId: id,
				}
			)
			if (linked.errors) throw linked.errors
			if (!linked.data) throw "Unable to Link Health Details to the User"

			return response.data.initialHealth.id
		} catch (error) {
			Console.error(error)
			throw error.toString()
		}
	}

}
