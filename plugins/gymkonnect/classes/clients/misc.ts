import GQLClient, { gql } from "@/utils/graphql"
import { Logger } from "@classes/CONSOLE"
import { sleep } from "@classes/misc"

let Console = new Logger("gk-client/registration")

export async function generateBadgenumber(quantity: number = 1): Promise<(string|number)[]>{
	let result = await GQLClient.query<{ badges: (string | number)[]}>(
		gql` query generateBadgenumber( $quantity: Float! ){ badges: generateBadgenumber(quantity: $quantity) } `,
		{ quantity, },
		{ fetchPolicy: "no-cache", }
	)
	console.log(result)
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
		if (response.errors) throw response.errors
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
		if (response.errors) throw response.errors
		if (!response.data) throw "Unable to verify if mobile exists"
		return response.data.exists
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

export class Health {
	public static async addInitialHealth(id: string | number, height: number, weight: number, bodyType: string | number, bloodGroup: string | number): Promise<string|number>{
		await sleep(2000)
		// throw "Unable to save Health"
		return 1
	}
}